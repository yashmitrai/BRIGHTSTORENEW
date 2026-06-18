"use client";
import { useEffect } from "react";
import { io } from "socket.io-client";
export type InventoryEvent={id:string;productId:string;stock:number;pricePaise:number;isAvailable:boolean;version:number};
export function useInventoryRealtime(onUpdate:(inventory:InventoryEvent)=>void){
 useEffect(()=>{
  const socket=io(process.env.NEXT_PUBLIC_SOCKET_URL??"http://localhost:4000",{transports:["websocket"]});
  socket.emit("catalog:subscribe");
  socket.on("inventory:updated",onUpdate);
  return()=>{socket.off("inventory:updated",onUpdate);socket.disconnect()};
 },[onUpdate]);
}
