import { Router } from "express";
import UserController from "../controller/user-controller";
import {authRateMiddleware} from "../middleware/rate-limiting-middleware";

const router=Router();
router.post("/register", UserController.userRegister);
router.post("/login", authRateMiddleware,UserController.loginuser);
export default router;