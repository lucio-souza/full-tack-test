import  express  from "express";
import UserController from "../controller/UserController";

const userRouter = express.Router();

userRouter.post('/',UserController.create);
userRouter.get('/',UserController.getAll);
userRouter.post('/login',UserController.login)

export default userRouter