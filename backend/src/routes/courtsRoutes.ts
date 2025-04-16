import CourtsController from "../controller/CourtsController";
import express from "express";
import { verifyToken } from "../middlewares/verifyToken";

const courtsRouter = express.Router();

courtsRouter.post('/',verifyToken,CourtsController.createCourt);
courtsRouter.get('/',CourtsController.listAllCourts);
courtsRouter.get('/:id',CourtsController.listOneById);
courtsRouter.delete('/:id',verifyToken,CourtsController.eraseById);
courtsRouter.put('/:id',verifyToken,CourtsController.editCourt);
courtsRouter.patch('/:id/availability',verifyToken,CourtsController.editPartialCourt);


export default courtsRouter;


