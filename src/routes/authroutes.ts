import e, { Request, Response } from "express";
const { Router } = require('express')
import { loginGoogle } from "../controller/controller.users";
const router = Router()



router.post('/auth/google', loginGoogle)


export default router

