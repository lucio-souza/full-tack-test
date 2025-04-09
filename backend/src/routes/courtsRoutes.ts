import CourtsController from "../controller/CourtsController";
import express from "express";

const courtsRouter = express.Router();

courtsRouter.post('/',CourtsController.createCourt);
courtsRouter.get('/',CourtsController.listAllCourts)

export default courtsRouter;


