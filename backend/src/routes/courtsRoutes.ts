import CourtsController from "../controller/CourtsController";
import express from "express";

const courtsRouter = express.Router();

courtsRouter.post('/',CourtsController.createCourt);
courtsRouter.get('/',CourtsController.listAllCourts);
courtsRouter.get('/:id',CourtsController.listOneById);
courtsRouter.delete('/:id',CourtsController.eraseById);
courtsRouter.put('/:id',CourtsController.editCourt);
courtsRouter.patch('/:id/availability',CourtsController.editPartialCourt);


export default courtsRouter;


