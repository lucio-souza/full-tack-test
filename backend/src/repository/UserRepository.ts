import User from "../model/User";
import { hash,compare } from "bcrypt";
import { userType } from "../types/userTypes";
import { sign } from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();

class UserRepository{

    async create(user:userType){
        try {
            const senhaCripitografada = await hash(user.senha, 2);
            const newUser =await User.create({email:user.email,senha:senhaCripitografada})
            console.log(newUser);
            
            return {status:201,newUser}
        } catch (error) {
            return {status:400,message:'erro ao criar usuario',error}
        }
    }

    async listAll(){
        try {
            const users = await User.findAll()

            return {status:200,users}
        } catch (error) {
            return {status:404,message:'erro ao listar usuarios',error}
        }
    }

    async login(user:userType){
        try {
            const data = await User.findOne({where:{email:user.email}})

            if(data){
                const verifyPassword = await compare(user.senha,data.dataValues.senha)

                if(!verifyPassword){
                    return {message:'Senha incorreta',status:404,error:null};
                }
                
                const token=sign(
                    { id:data.dataValues.id },
                    process.env.TOKEN_KEY as string,
                    { expiresIn:"12hrs" }
                )
                return {token,status:200}
            }
            return { message: `Usuario inexistente`, status: 404};
        } catch (error) {
            return {status:500,message:'erro interno',error}
        }
    }

}

export default new UserRepository();