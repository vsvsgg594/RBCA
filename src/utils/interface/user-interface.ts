import { JwtPayload } from "jsonwebtoken";
export interface RegisterPayLoad{
    userId?:string;
    name:string;
    email:string;
    password:string
    role?:string;

}
export interface LoginPayLoad{
    email:string;
    password:string;
}

export interface Jwtload extends JwtPayload{
    userId:string;
    email:string;
    role:string;
}