import User from "../model/User";
import { hash } from "bcrypt";
import { userType } from "../types/userTypes";

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


}

export default new UserRepository();