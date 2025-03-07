import express from "express";
import cors from "cors"
import dotenv from 'dotenv'

import authenticateUser from "./controllers/authMiddleware.js";
import {decodeJWT, userLogin, userRegister} from "./controllers/userController.js";
import {getRequest, postRequest} from "./controllers/flureeProxy.js";

dotenv.config()

const PORT = process.env.MW_BACKEND_PORT;

const app = express();

app.use(cors())
app.use(express.json({limit: '300kb'}))

app.post('/api/me', decodeJWT)
app.post('/api/login', userLogin)
app.post('/api/register', userRegister)
app.post('/api/get', authenticateUser, getRequest)
app.post('/api/post', authenticateUser, postRequest)

app.listen(PORT, () => {
    console.log(`MWB2 Backend is listening on port ${PORT}`);
});