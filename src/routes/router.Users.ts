import { Router } from 'express';
import { userSignup, userLogin } from '../controller/controller.users';

const router = Router()


router.post('/registro', userSignup )
router.post('/login', userLogin)


export default router