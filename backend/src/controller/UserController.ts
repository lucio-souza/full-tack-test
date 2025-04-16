import UserRepository from "../repository/UserRepository";
import { Request,Response } from "express";

class UserController{
    async create(req:Request,res:Response){
        const {email,senha}= req.body;

        const data = await UserRepository.create({email,senha});

        data.status === 201 
        ? res.status(data.status).json(data.newUser) 
        : res.status(data.status).json({message:data.message,erro:data.error});
    }

    async getAll(req:Request,res:Response){
        const data = await UserRepository.listAll();

        data.status === 200
        ? res.status(data.status).json(data.users) 
        : res.status(data.status).json({message:data.message,erro:data.error});
    }
}

export default new UserController();