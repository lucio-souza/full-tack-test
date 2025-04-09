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
            
            const courts = await Courts.findAll({ where: whereClause });
            return { status: 200, courts };
        } catch (error) {
            return {message:'erro ao listar quadras',status:404,error}
        }
    }

    async getOneById(id:string){
        try {
            const court = await Courts.findByPk(id);
            return {status:200,court}
        } catch (error) {
            return {message:'erro ao listar a quadra',status:404,error}
        }
    }
}

export default new CourtsRespository();