import { Request,Response,NextFunction } from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();

export async function verifyToken(req:Request,res:Response,next:NextFunction){
    const token=req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Token não fornecido" });
      }
      try {
        verify(token, process.env.TOKEN_KEY as string);
        next();
      } catch (error) {
          return res.status(401).json({message:error});
      }
    
     
}