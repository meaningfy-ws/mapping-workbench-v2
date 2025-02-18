import express from 'express';
import {addProject, deleteProject, getAllProjects, updateProject} from "../controllers/projectController.js";
import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/', getAllProjects);
router.post('/', addProject);
router.delete('/', deleteProject);
router.put('/', updateProject)

export default router;