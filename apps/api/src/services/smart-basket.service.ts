export type BasketItem = { productId: string; quantity: number };
export type Offer = { storeId: string; storeName: string; productId: string; unitPricePaise: number; availableStock: number; deliveryFeePaise: number };
export type Assignment = Offer & { quantity: number; lineTotalPaise: number };
export type BasketPlan = { kind: "mixed" | "single"; stores: { storeId: string; storeName: string; deliveryFeePaise: number; items: Assignment[]; subtotalPaise: number; totalPaise: number }[]; subtotalPaise: number; deliveryPaise: number; totalPaise: number; missingProductIds: string[] };

function planFrom(assignments: Assignment[], missingProductIds: string[], kind: BasketPlan["kind"]): BasketPlan {
  const grouped = new Map<string, BasketPlan["stores"][number]>();
  for (const item of assignments) {
    const store = grouped.get(item.storeId) ?? { storeId: item.storeId, storeName: item.storeName, deliveryFeePaise: item.deliveryFeePaise, items: [], subtotalPaise: 0, totalPaise: 0 };
    store.items.push(item);
    store.subtotalPaise += item.lineTotalPaise;
    grouped.set(item.storeId, store);
  }
  const stores = [...grouped.values()].map(s => ({ ...s, totalPaise: s.subtotalPaise + s.deliveryFeePaise }));
  const subtotalPaise = stores.reduce((sum,s)=>sum+s.subtotalPaise,0);
  const deliveryPaise = stores.reduce((sum,s)=>sum+s.deliveryFeePaise,0);
  return { kind, stores, subtotalPaise, deliveryPaise, totalPaise: subtotalPaise+deliveryPaise, missingProductIds };
}

export function optimizeBasket(items: BasketItem[], offers: Offer[], maxStores = 3) {
  const validByProduct = new Map<string, Offer[]>();
  for (const item of items) {
    const candidates = offers.filter(o=>o.productId===item.productId&&o.availableStock>=item.quantity).sort((a,b)=>a.unitPricePaise-b.unitPricePaise).slice(0,8);
    validByProduct.set(item.productId,candidates);
  }
  const missing = items.filter(i=>!validByProduct.get(i.productId)?.length).map(i=>i.productId);

  const storeIds = [...new Set(offers.map(o=>o.storeId))];
  const singlePlans = storeIds.map(storeId => {
    const assignments: Assignment[]=[]; const absent:string[]=[];
    for (const item of items) {
      const offer=validByProduct.get(item.productId)?.find(o=>o.storeId===storeId);
      if(!offer) absent.push(item.productId); else assignments.push({...offer,quantity:item.quantity,lineTotalPaise:offer.unitPricePaise*item.quantity});
    }
    return planFrom(assignments,absent,"single");
  }).filter(p=>p.missingProductIds.length===0).sort((a,b)=>a.totalPaise-b.totalPaise);

  let bestMixed: BasketPlan | undefined;
  function search(index:number, chosen:Assignment[], used:Set<string>) {
    if(used.size>maxStores) return;
    if(bestMixed) {
      const partial=chosen.reduce((s,x)=>s+x.lineTotalPaise,0)+[...used].reduce((s,id)=>s+(offers.find(o=>o.storeId===id)?.deliveryFeePaise??0),0);
      if(partial>=bestMixed.totalPaise) return;
    }
    if(index===items.length) {
      const candidate=planFrom(chosen,missing,"mixed");
      if(!bestMixed||candidate.totalPaise<bestMixed.totalPaise) bestMixed=candidate;
      return;
    }
    const item=items[index];
    for(const offer of validByProduct.get(item.productId)??[]) {
      const next=new Set(used); next.add(offer.storeId);
      search(index+1,[...chosen,{...offer,quantity:item.quantity,lineTotalPaise:offer.unitPricePaise*item.quantity}],next);
    }
  }
  if(!missing.length) search(0,[],new Set());
  const cheapestSingle=singlePlans[0];
  const recommended=bestMixed && (!cheapestSingle||bestMixed.totalPaise<cheapestSingle.totalPaise) ? bestMixed : cheapestSingle;
  return {
    recommended: recommended ?? planFrom([],missing,"mixed"),
    mixed: bestMixed,
    cheapestSingle,
    singleStoreComparisons: singlePlans,
    savingsPaise: cheapestSingle&&recommended ? Math.max(0,cheapestSingle.totalPaise-recommended.totalPaise) : 0,
    evaluatedStores: storeIds.length
  };
}
