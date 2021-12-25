import { Router } from 'express';
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/tasks.controllers';
import { isAuth } from '../middleware/isAuth';

const router = Router();

router.get('/', isAuth, getTasks);
router.post('/', isAuth, createTask);
router.patch('/:id', isAuth, updateTask);
router.delete('/:id', isAuth, deleteTask);

export default router;
