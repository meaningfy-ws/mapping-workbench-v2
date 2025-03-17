import express from "express";
import cors from "cors"

import authenticateUser from "./controllers/authMiddleware.ts";
import {decodeJWT, userLogin, userRegister} from "./controllers/userController.ts";
import {deleteRequest, getRequest, postRequest, putRequest} from "./controllers/flureeProxy.ts";

const app = express();

app.use(cors())
app.use(express.json({limit: '3000kb'}))

app.post('/api/me', decodeJWT)
app.post('/api/login', userLogin)
app.post('/api/register', userRegister)
app.post('/api/get', authenticateUser, getRequest)
app.post('/api/post', authenticateUser, postRequest)
app.put('/api/put', authenticateUser, putRequest)
app.delete('/api/delete', authenticateUser, deleteRequest)


export default app