import { Router } from 'express';
import { register, verifyEmail } from '../controllers/auth.controller.js';

const authRouter = Router()


authRouter.post('/register', register)

authRouter.get('/verify-email', verifyEmail)

export default authRouter