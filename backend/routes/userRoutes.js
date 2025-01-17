import express from 'express'
import { loginUser, registerUser } from '../controllers/userController.js'

const userRoutes = express.Router()

userRoutes.post('/api/users/register', registerUser)
userRoutes.post('/api/users/login', loginUser)

export default userRoutes