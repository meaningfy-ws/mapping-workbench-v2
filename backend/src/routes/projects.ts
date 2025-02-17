import express from 'express';
import {addProject, deleteProject, getAllProjects} from "../controllers/projectController.js";

const router = express.Router();

router.get('/', getAllProjects);
router.post('/',addProject);
router.delete('/',deleteProject);

export default router;