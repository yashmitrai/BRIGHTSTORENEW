import { createServer } from "node:http";
import { Server } from "socket.io";
import { createApp } from "./app.js";
import { config } from "./config.js";
import { prisma } from "./lib/prisma.js";

const httpServer=createServer();
const io=new Server(httpServer,{cors:{origin:config.WEB_URL.split(","),credentials:true}});
const app=createApp(io);
httpServer.on("request",app);
io.on("connection",socket=>{
 socket.on("catalog:subscribe",()=>socket.join("catalog"));
 socket.on("store:subscribe",(storeId:string)=>socket.join(`store:${storeId}`));
 socket.on("order:subscribe",(orderId:string)=>socket.join(`order:${orderId}`));
});
httpServer.listen(config.PORT,()=>console.log(`BRIGHTSTORE API listening on :${config.PORT}`));
async function shutdown(){io.close();httpServer.close();await prisma.$disconnect();process.exit(0)}
process.on("SIGTERM",shutdown); process.on("SIGINT",shutdown);
