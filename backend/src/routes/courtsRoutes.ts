import CourtsController from "../controller/CourtsController";
import express from "express";

const courtsRouter = express.Router();

courtsRouter.post('/',CourtsController.createCourt);
courtsRouter.get('/',CourtsController.listAllCourts);
courtsRouter.get('/:id',CourtsController.listOneById);

export default courtsRouter;


