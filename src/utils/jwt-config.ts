import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Jwtload } from "./interface/user-interface";

dotenv.config();
const ACCESS_TOKEN=process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN=process.env.REFRESH_TOKEN_SECRET!;

export const generateAccessToken=(payload:object)=>{
    return jwt.sign(payload,ACCESS_TOKEN,{expiresIn:"24h"})

}

export const generateRefreshToken=(paylaod:object)=>{
    return jwt.sign(paylaod,REFRESH_TOKEN,{expiresIn:"5d"})
}

export const verifyToken=(token:string)=>{
    return jwt.verify(token,ACCESS_TOKEN) as Jwtload;
}
