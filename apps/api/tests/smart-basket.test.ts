import { describe, expect, it } from "vitest";
import { optimizeBasket, type Offer } from "../src/services/smart-basket.service.js";

const items=[{productId:"rice",quantity:1},{productId:"oil",quantity:1},{productId:"dal",quantity:1}];
const offers:Offer[]=[
 {storeId:"a",storeName:"A",productId:"rice",unitPricePaise:12000,availableStock:40,deliveryFeePaise:0},
 {storeId:"b",storeName:"B",productId:"rice",unitPricePaise:11000,availableStock:40,deliveryFeePaise:0},
 {storeId:"c",storeName:"C",productId:"rice",unitPricePaise:13000,availableStock:40,deliveryFeePaise:0},
 {storeId:"a",storeName:"A",productId:"oil",unitPricePaise:18000,availableStock:40,deliveryFeePaise:0},
 {storeId:"b",storeName:"B",productId:"oil",unitPricePaise:20000,availableStock:40,deliveryFeePaise:0},
 {storeId:"c",storeName:"C",productId:"oil",unitPricePaise:16000,availableStock:40,deliveryFeePaise:0},
 {storeId:"a",storeName:"A",productId:"dal",unitPricePaise:9000,availableStock:40,deliveryFeePaise:0},
 {storeId:"b",storeName:"B",productId:"dal",unitPricePaise:8000,availableStock:40,deliveryFeePaise:0},
 {storeId:"c",storeName:"C",productId:"dal",unitPricePaise:9500,availableStock:40,deliveryFeePaise:0}
];
describe("Smart Basket",()=>{
 it("finds the exact cheapest mixed and single-store baskets",()=>{
  const result=optimizeBasket(items,offers,3);
  expect(result.mixed?.totalPaise).toBe(35000);
  expect(result.cheapestSingle?.totalPaise).toBe(38500);
  expect(result.savingsPaise).toBe(3500);
  expect(result.recommended?.stores).toHaveLength(2);
 });
 it("includes per-store delivery fees once",()=>{
  const result=optimizeBasket(items,offers.map(o=>({...o,deliveryFeePaise:1000})),3);
  expect(result.mixed?.totalPaise).toBe(37000);
  expect(result.cheapestSingle?.totalPaise).toBe(39500);
 });
 it("reports unavailable products instead of returning an invalid plan",()=>{
  const result=optimizeBasket([...items,{productId:"milk",quantity:1}],offers,3);
  expect(result.recommended.missingProductIds).toEqual(["milk"]);
  expect(result.mixed).toBeUndefined();
 });
 it("respects maximum store count",()=>{
  const result=optimizeBasket(items,offers,1);
  expect(result.mixed?.stores).toHaveLength(1);
  expect(result.recommended.totalPaise).toBe(38500);
 });
});
