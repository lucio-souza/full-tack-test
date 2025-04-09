import Courts from "../model/courts";
import { CourtsType } from "../types/courtsTypes";

class CourtsRespository{

    async create(name:CourtsType,location:CourtsType){
       try{ 
        const newCourt=await Courts.create({name,location});

        return {newCourt,status:201}
       }catch(error){
        return {message:'erro ao criar quadra',status:400,error}
       }
    }

    async getAll(availableFilter:boolean | undefined){
        try {
            const whereClause = availableFilter !== undefined ? {available: availableFilter } : {};
            console.log(whereClause);
            
            const courts = await Courts.findAll({ where: whereClause });
            return { status: 200, courts };
        } catch (error) {
            return {message:'erro ao listar quadras',status:400,error}
        }
    }
}

export default new CourtsRespository();