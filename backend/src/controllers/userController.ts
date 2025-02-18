import express, {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import {jwtDecode, JwtPayload} from "jwt-decode";
import path from "path";
import fs from 'fs/promises'
import bcrypt from "bcryptjs";

interface User {
    id: number;
    email: string;
    username?: string;
    password: string;
}

interface AuthRequest extends Request {
    user?: JwtPayload | null;
}


const secret = process.env.JWT_SECRET ?? 'devias-top-secret-key'

const __dirname = path.resolve()

const usersFile = path.join(__dirname,"src/data/users.json");
console.log(usersFile)

export const loadUsers = async (): Promise<User[]> => {
    try {
        const data = await fs.readFile(usersFile, "utf-8");
        return JSON.parse(data) as User[];
    } catch (error) {
        return []; // Return empty array if file doesn't exist
    }
};

const saveUsers = async (users: User[]): Promise<void> => {
    await fs.writeFile(usersFile, JSON.stringify(users, null, 2), "utf-8");
};

const users: User[] = await loadUsers();


export const decodeJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.body.accessToken;
    console.log(req.body.accessToken)
    console.log('token', token)
    if (token)
        try {
            const decode: User = jwtDecode(token);
            const {email, username, id} = decode
            // next(); // Proceed to the next middleware
            res.status(200).json({email, username, id})
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





export const userRegister = (req: Request, res: Response): void => {
    const {email, username, password} = req.body;

    // Check if user already exists
    if (users.find((u) => u.email === email)) {
        res.status(400).json({message: "Email already registered"});
        return
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create new user
    const newUser: User = {
        id: users.length + 1,
        email,
        username,
        password: hashedPassword,
    };

    users.push(newUser);
    saveUsers(users); // Save users to file

    // Generate JWT Token
    const token = jwt.sign({id: newUser.id, email: newUser.email}, secret as string, {
        expiresIn: "1h",
    });

    res.status(201).json(token);
}
