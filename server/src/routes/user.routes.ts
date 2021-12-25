import { Router } from 'express';
import { getCurrentUser, loginHandler, signupHandler } from '../controllers/user.controllers';
import { isAuth } from '../middleware/isAuth';

const router = Router();

router.post('/signup', signupHandler);
router.post('/login', loginHandler);
router.get('/me', isAuth, getCurrentUser);

export default router;
