import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import {jwtDecode, JwtPayload} from "jwt-decode";

interface User {
    id: number;
    email: string;
    password: string;
}

interface AuthRequest extends Request {
    user?: JwtPayload | null;
}

const secret = process.env.JWT_SECRET ?? 'devias-top-secret-key'

const users: User[] = [{id: 1, email: "demo@devias.io", password: "Password123!"}];

export const decodeJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.header("Authorization");
    console.log(token)
    if (token)
        try {
            const decoded = jwtDecode<JwtPayload>(token.replace("Bearer ", ""));
            req.user = decoded; // Attach the decoded data to req.user
            next(); // Proceed to the next middleware
        } catch (error) {
            res.status(400).json({message: "Invalid Token"});
        }
};

export const userLogin = (req: Request, res: Response): void => {
    console.log('login', req.body)
    const {email, password} = req.body;

    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
        res.status(400).json({message: "Invalid credentials"});
        return
    }

    const token = jwt.sign({id: user.id, email: user.email}, secret as string, {expiresIn: "1h"});
    res.json(token);
};