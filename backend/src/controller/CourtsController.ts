import {Request,Response} from "express"
import CourtsRespository from "../repository/CourtsRepository";
import CourtsRepository from "../repository/CourtsRepository";

class CourtsController{

    async createCourt(req:Request,res:Response){
        const {name,location}=req.body;

        const data = await CourtsRespository.create(name,location);
        data.status === 201 
        ? res.status(data.status).json(data.newCourt) 
        : res.status(data.status).json({message:data.message,erro:data.error});
    }
    async listAllCourts(req:Request,res:Response){
        const {available}=req.query;

        let availableFilter;
        if (available === 'true') {
            availableFilter = true;
        } else if (available === 'false') {
            availableFilter = false;
        }

        const data = await CourtsRespository.getAll(availableFilter);

        data.status === 200
        ? res.status(data.status).json(data.courts)
        : res.status(data.status).json({ message: data.message, erro: data.error });
    }

    async listOneById(req:Request,res:Response){
        const {id}=req.params;

        const data = await CourtsRepository.getOneById(id);

        data.status === 200
        ? res.status(data.status).json(data.court)
        : res.status(data.status).json({ message: data.message, erro: data.error });
    }

}

export default new CourtsController();