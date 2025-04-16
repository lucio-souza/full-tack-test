import { Request,Response,NextFunction } from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();

export function verifyToken(req:Request,res:Response,next:NextFunction){
    const authHeader = req.headers.authorization as string;

    if (!authHeader) {
        res.status(401).json({ message: "Token não fornecido" });
      }
      const token = authHeader.replace("Bearer ", "");
      try {
        console.log("deu cerrto");
        
        verify(token, process.env.TOKEN_KEY as string);
        next();
      } catch (error) {
          res.status(401).json({message:error});
      }
}