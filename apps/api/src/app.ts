import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import type { Server } from "socket.io";
import { config } from "./config.js";
import { routes } from "./routes.js";
import { errorHandler } from "./middleware/error.js";

export function createApp(io:Server){
 const app=express();
 app.set("trust proxy",1);
 app.use(helmet());
 app.use(cors({origin:config.WEB_URL.split(",").map(x=>x.trim()),credentials:true}));
 app.use(express.json({limit:"1mb"}));
 app.use(rateLimit({windowMs:60_000,limit:180,standardHeaders:"draft-7",legacyHeaders:false}));
 app.get("/health",(_req,res)=>res.json({status:"ok",service:"brightstore-api",timestamp:new Date().toISOString()}));
 app.use("/api/v1",routes(io));
 app.use((_req,res)=>res.status(404).json({error:{code:"NOT_FOUND",message:"Route not found"}}));
 app.use(errorHandler);
 return app;
}
