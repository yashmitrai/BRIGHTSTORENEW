import { OrderStatus } from "@prisma/client";
import { prisma } from "../lib/prisma.js";
import { AppError } from "../lib/errors.js";

type CreateOrder = { addressId: string; idempotencyKey?: string; stores: { storeId: string; deliveryPaise?: number; items: { inventoryId: string; quantity: number }[] }[] };
export async function createOrder(userId: string, input: CreateOrder) {
  if (input.idempotencyKey) {
    const existing = await prisma.order.findUnique({ where: { idempotencyKey: input.idempotencyKey }, include: { storeOrders: { include: { items: true } } } });
    if (existing) return existing;
  }
  return prisma.$transaction(async tx => {
    const inventoryIds = input.stores.flatMap(s=>s.items.map(i=>i.inventoryId));
    const inventories = await tx.inventory.findMany({ where: { id: { in: inventoryIds } }, include: { product: true } });
    const byId = new Map(inventories.map(i=>[i.id,i]));
    for (const store of input.stores) for (const item of store.items) {
      const inv=byId.get(item.inventoryId);
      if (!inv || inv.storeId!==store.storeId || !inv.isAvailable || inv.stock-inv.reservedStock<item.quantity) throw new AppError(409,"INSUFFICIENT_STOCK",`${inv?.product.name??"Item"} is no longer available`);
    }
    const subtotal = input.stores.reduce((sum,s)=>sum+s.items.reduce((n,i)=>n+byId.get(i.inventoryId)!.pricePaise*i.quantity,0),0);
    const delivery = input.stores.reduce((sum,s)=>sum+(s.deliveryPaise??0),0);
    const order = await tx.order.create({ data: { orderNumber:`BS-${Date.now().toString().slice(-8)}`,userId,addressId:input.addressId,subtotalPaise:subtotal,deliveryPaise:delivery,totalPaise:subtotal+delivery,idempotencyKey:input.idempotencyKey,storeOrders:{create:input.stores.map(s=>{const sub=s.items.reduce((n,i)=>n+byId.get(i.inventoryId)!.pricePaise*i.quantity,0);return {storeId:s.storeId,subtotalPaise:sub,deliveryPaise:s.deliveryPaise??0,totalPaise:sub+(s.deliveryPaise??0),items:{create:s.items.map(i=>{const inv=byId.get(i.inventoryId)!;return {productId:inv.productId,inventoryId:inv.id,productName:inv.product.name,sku:inv.sku,quantity:i.quantity,unitPricePaise:inv.pricePaise,mrpPaise:inv.mrpPaise,totalPaise:inv.pricePaise*i.quantity}})}}})}}, include:{storeOrders:{include:{items:true}}} });
    for (const item of input.stores.flatMap(s=>s.items)) await tx.inventory.update({where:{id:item.inventoryId},data:{reservedStock:{increment:item.quantity},version:{increment:1}}});
    return order;
  },{isolationLevel:"Serializable"});
}
export async function updateStatus(orderId:string,status:OrderStatus){
  return prisma.order.update({where:{id:orderId},data:{status,storeOrders:{updateMany:{where:{},data:{status}}}},include:{storeOrders:true}});
}
