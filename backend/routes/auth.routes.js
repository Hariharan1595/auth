import express from 'express';
import { signin, signout, signup, verifyEmail,forgotPassword,resetPassword, getUser } from '../controllers/auth.controllers.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/signup',signup);
router.post('/signin',signin);
router.post('/signout',signout);

router.post('/verify-email',verifyEmail);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password/:token',resetPassword);

router.get('/check-auth',verifyToken,getUser )

export default router;