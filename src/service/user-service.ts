import { where } from "sequelize";
import User from "../model/user";
import { generateuuId } from "../utils/fn/generate-uuid";
import { LoginPayLoad, RegisterPayLoad } from "../utils/interface/user-interface";
import bcrypt from "bcrypt";
import { generateAccessToken } from "../utils/jwt-config";
import {getSocketInstance} from "./socket-service";

class UserService{
    static async createUser(payload:RegisterPayLoad){
        if(!payload){
            return "payload empty";
        }
        const {name,email,password,role}=payload;
        if(!name||!email||!password){
            throw new Error("All Fields are required");
        }
        const existUser=await User.findOne({where:{email}});
        if(existUser){
            throw new Error("User exits");
        }
        const hashpassword=await bcrypt.hash(password,12);
        const io=getSocketInstance();
        const user=await User.create(
          {
            userId:generateuuId(),
            name,
            email,
            password:hashpassword,
            role:role ||"USER",
          }
        )
        io.emit("userregisterdata",{
            userId: user.userId,
            name: user.name,
            email: user.email,
            role: user.role,
        })
        return user;
    }
    static async loginUser(payload:LoginPayLoad){
        try{
            const{email,password}=payload;
            console.log("email",email);
            if(!email||!password){
                throw new Error("All fields are requried");
            }
            const existUSER=await User.findOne({where:{email}});
            if(!existUSER){
                throw new Error("User not exits with email");
            }
            const isMatchPassowrd=await existUSER.validatePassword(password);
            if(!isMatchPassowrd){
                throw new Error("password does not match");
            }
            const accessToken=generateAccessToken(
                {
                    userId:existUSER.userId,
                    email:existUSER.email,
                    role:existUSER.role
                }
            )
            const io=getSocketInstance();
            io.emit("loginData",{
                userId:existUSER.userId,
                name:existUSER.name,
                email:existUSER.email,
                role:existUSER.role,
                accessToken
            })
            return {
            message: "Login successful",
            existUSER,
            accessToken,
           };
            

        }catch(error){
            console.log("failed to login", error);
            throw new Error("error")

        }

    }
}
export default UserService;