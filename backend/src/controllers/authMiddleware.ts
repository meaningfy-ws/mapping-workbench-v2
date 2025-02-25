import {Request, Response, NextFunction} from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

interface AuthRequest extends Request {
    user?: JwtPayload | string; // Attach user payload after verification
}

const secret = process.env.JWT_SECRET ?? ''

const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization");

    if (!token) {
        res.status(401).json({message: "Access Denied. No token provided."});
        return
    }

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), secret);
        req.user = verified;
        next();
    } catch (error) {
        res.status(403).json({message: "Invalid Token"});
    }
};

export default authenticateUser;
