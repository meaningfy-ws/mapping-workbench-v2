import { Request, Response, NextFunction } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: JwtPayload | string; // Attach user payload after verification
}

const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction):void => {
    const token = req.header("Authorization");

    if (!token) {
        res.status(401).json({ message: "Access Denied. No token provided." });
        return
    }

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET as string);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

export default authenticateUser;
