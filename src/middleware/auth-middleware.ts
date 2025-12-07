import {Request,Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt-config";
import {Jwtload} from "../utils/interface/user-interface";
import { CONSTANT } from "../CONSTANT/constant";

export const adminRoleMiddleware = (
  req: Request & { user?: Jwtload },
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization;
    console.log("tto",token);
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }
    console.log("token",token);
    const decoded = verifyToken(token);
    console.log("decoed",decoded);
    req.user = decoded;
    console.log("user",req.user)
    if (decoded.role !== CONSTANT.USER_TYPE.ADMIN) {
      return res.status(403).json({
        message: "Forbidden: Admin role required",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      message: "Authorization failed",
      error,
    });
  }
};