import {Request, Response} from "express";
import jwt from "jsonwebtoken";

interface User {
    id: number;
    email: string;
    password: string;
}

const secret = process.env.JWT_SECRET ?? 'devias-top-secret-key'

const users: User[] = [{id: 1, email: "demo@devias.io", password: "Password123!"}];

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