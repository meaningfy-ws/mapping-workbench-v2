import {Request, Response, NextFunction} from "express";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {jwtDecode, JwtPayload} from "jwt-decode";
import fs from 'fs/promises'
import dotenv from "dotenv";

dotenv.config()

interface User {
    id: number;
    email: string;
    username?: string;
    password: string;
}

interface AuthRequest extends Request {
    user?: JwtPayload | null;
}


const secret = process.env.JWT_SECRET

const dirname = path.resolve()

const usersFile = path.join(dirname, "src/data/users.json");

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


export const decodeJWT = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.body.accessToken;
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

export const userLogin = async (req: Request, res: Response): Promise<void> => {
    const {email, password} = req.body;

    const users: User[] = await loadUsers();


    const user = users.find((u) => u.email === email);
    if (!user) {
        res.status(400).json({message: "Invalid credentials"});
        return
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        res.status(400).json({message: "Invalid credentials"});
        return
    }

    const token = jwt.sign({id: user.id, email: user.email}, secret as string, {expiresIn: "1h"});
    res.json(token);
};


export const userRegister = async (req: Request, res: Response): Promise<void> => {
    const {email, username, password} = req.body;

    const users: User[] = await loadUsers();

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
