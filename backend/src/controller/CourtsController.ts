import {Request,Response} from "express"
import CourtsRespository from "../repository/CourtsRepository";

class CourtsController{

    async createCourt(req:Request,res:Response){
        const {name,location}=req.body;

        const data = await CourtsRespository.create(name,location);
        data.status===201?res.status(data.status).json(data.newCourt):res.status(data.status).json({message:data.message,erro:data.error})
    }
    async listAllCourts(req:Request,res:Response){
        const {available}=req.query;

        let availableFilter;
        if (available === 'true') {
            availableFilter = true;
        } else if (available === 'false') {
            availableFilter = false;
        } else{ availableFilter = undefined }

        console.log(available);
        

        const data =await CourtsRespository.getAll(availableFilter)

        data.status === 200
        ? res.status(200).json(data.courts)
        : res.status(data.status).json({ message: data.message, erro: data.error });
    }
}

export default new CourtsController();