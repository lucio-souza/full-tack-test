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

            if (!court) {
                return {status:404,message:'quadra inexistente'}
            }
            
            return {status:200,court}
        } catch (error) {
            return {message:'erro ao listar a quadra',status:404,error}
        }
    }

    async deleteCourtById(id:string){
        try {
            const data = await this.getOneById(id);

            if(data.status===404){
                return {status:data.status,message:'quadra inexistente não é possivel apaga-lá'};
            }
            
            await Courts.destroy({where:{id}})
            return {status:200,message:'quadra apagada com sucesso'}
        } catch (error) {
            return {message:'erro ao listar quadras',status:500,error}
        }
    }

    async editCourt(id:string,name:CourtsType,location:CourtsType){
        try {
            const data =await this.getOneById(id);

            if(data.status === 404){
                return {status:data.status,message:'quadra inexistente não é possivel editala-lá'};
            }

            await Courts.update(
                {name,location},
                {where:{id}}
            );
            
            return {status:200,message:'quadra editada com sucesso'};
        } catch (error) {
            return {message:'erro interno',status:500,error}
        }
    }

    async editPartialCourt(id:string){
        try {
        const data =await this.getOneById(id);

        const value = data.court?.dataValues.available;
        
        if(!data.court){
            return {status:data.status,message:'quadra inexistente não é possivel editala-lá'};
        }

        await Courts.update({available:!value},{where:{id}});
        return {status:200,message:'disponibilidade da quadra alterada com sucesso'};

        } catch (error) {
            return {message:'erro interno',status:500,error}
        }
    }
}

export default new CourtsRespository();