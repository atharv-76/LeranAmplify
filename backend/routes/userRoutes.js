import express from 'express';
import { loginUser, registerUser, getUserDetails } from '../controllers/userController.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUser);
userRoutes.post('/login', loginUser);

userRoutes.get('/:id', getUserDetails);

export default userRoutes;
