import { PrismaClient, RetailerStatus, Role, SubscriptionStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma=new PrismaClient();

async function main(){
 const passwordHash=await bcrypt.hash("Brightstore123!",12);
 const categories=await Promise.all([
  ["Staples","staples"],["Dairy & Eggs","dairy-eggs"],["Fresh Produce","fresh-produce"],["Snacks","snacks"],["Beverages","beverages"],["Home Care","home-care"]
 ].map(([name,slug],sortOrder)=>prisma.category.upsert({where:{slug},update:{},create:{name,slug,sortOrder}})));
 const retailerUser=await prisma.user.upsert({where:{email:"retailer@brightstore.in"},update:{},create:{name:"Rajesh Gupta",email:"retailer@brightstore.in",phone:"+919876543210",passwordHash,role:Role.RETAILER}});
 const retailer=await prisma.retailer.upsert({where:{userId:retailerUser.id},update:{},create:{userId:retailerUser.id,businessName:"Gupta Retail Pvt Ltd",legalName:"Gupta Retail Private Limited",gstin:"29ABCDE1234F1Z5",status:RetailerStatus.APPROVED,approvedAt:new Date()}});
 const store=await prisma.store.upsert({where:{slug:"gupta-general-store"},update:{},create:{retailerId:retailer.id,name:"Gupta General Store",slug:"gupta-general-store",addressLine1:"24, 12th Main, Indiranagar",city:"Bengaluru",state:"Karnataka",postalCode:"560038",latitude:12.9784,longitude:77.6408,deliveryFeePaise:0,opensAt:"08:00",closesAt:"22:00",rating:4.9}});
 const productData=[
  ["India Gate Basmati Rice","india-gate-basmati-rice","India Gate","1 kg",11000,14500,"BS-RICE-01",0],
  ["Fortune Sunlite Oil","fortune-sunlite-oil","Fortune","1 L",16000,19000,"BS-OIL-01",0],
  ["Tata Sampann Toor Dal","tata-sampann-toor-dal","Tata","1 kg",18000,21500,"BS-DAL-01",0],
  ["Amul Taaza Milk","amul-taaza-milk","Amul","1 L",6800,7000,"BS-MILK-01",1],
  ["Aashirvaad Shudh Atta","aashirvaad-shudh-atta","Aashirvaad","5 kg",24800,29000,"BS-ATTA-01",0],
  ["Farm Fresh Bananas","farm-fresh-bananas","Farm Fresh","6 pcs",4200,5500,"BS-BANANA-01",2]
 ] as const;
 for(const [name,slug,brand,unitLabel,pricePaise,mrpPaise,sku,cat] of productData){
  const product=await prisma.product.upsert({where:{slug},update:{},create:{name,slug,brand,unitLabel,categoryId:categories[cat].id,imageUrls:[]}});
  await prisma.inventory.upsert({where:{storeId_sku:{storeId:store.id,sku}},update:{pricePaise,mrpPaise,stock:40},create:{storeId:store.id,productId:product.id,sku,pricePaise,mrpPaise,stock:40}});
 }
 const admin=await prisma.user.upsert({where:{email:"admin@brightstore.in"},update:{},create:{name:"BRIGHTSTORE Admin",email:"admin@brightstore.in",passwordHash,role:Role.ADMIN}});
 const customer=await prisma.user.upsert({where:{email:"customer@brightstore.in"},update:{},create:{name:"Demo Customer",email:"customer@brightstore.in",phone:"+919999999999",passwordHash,role:Role.CUSTOMER}});
 await prisma.address.upsert({where:{id:"demo-address"},update:{},create:{id:"demo-address",userId:customer.id,recipientName:"Demo Customer",phone:"+919999999999",line1:"24, 12th Main, Indiranagar",city:"Bengaluru",state:"Karnataka",postalCode:"560038",isDefault:true}});
 await prisma.subscription.createMany({data:[{retailerId:retailer.id,plan:"Growth",status:SubscriptionStatus.ACTIVE,amountPaise:499900,currentStart:new Date(),currentEnd:new Date(Date.now()+30*86400000)}],skipDuplicates:true});
 console.log({admin:admin.email,retailer:retailerUser.email,customer:customer.email,password:"Brightstore123!"});
}
main().finally(()=>prisma.$disconnect());
