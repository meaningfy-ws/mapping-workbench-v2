import express from "express";
import cors from "cors"
import dotenv from 'dotenv'

import projects from "./routes/projects.js";
import authenticateUser from "./middleware/authMiddleware.js";
import {decodeJWT, userLogin, userRegister} from "./controllers/userController.js";

dotenv.config()

const PORT = process.env.MW_BACKEND_PORT;

const app = express();

app.use(cors())
app.use(express.json())



app.post('/api/me', decodeJWT)
app.post('/api/login', userLogin)
app.post('/api/register', userRegister)
app.use('/api/projects', authenticateUser, projects)

app.listen(PORT, () => {
    console.log(`MWB2 Backend is listening on port ${PORT}`);
});