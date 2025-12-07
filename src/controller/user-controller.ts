import UserService from "../service/user-service";
import {Request,Response} from "express";
class UserController{
    static async userRegister(req:Request,res:Response){
        console.log('r',req.body);
        const response= await UserService.createUser(req.body);
        return res.status(201).json({messaage:response});
    }
    static async loginuser(req: Request, res: Response) {
  try {
    console.log("res",req.body);
    const response = await UserService.loginUser(req.body);

    return res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error: any) {
    console.log("Controller Error:", error.message);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

}
export default UserController;