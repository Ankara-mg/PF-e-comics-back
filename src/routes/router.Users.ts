import { Router } from 'express';
import { userSignup, userLogin,} from '../controller/controller.users';
import { verifyToken } from '../middleware/middleware';

const router = Router()


router.post('/singup', userSignup)

router.post('/login', userLogin)

//router.get ('/me', verifyToken, verificar)
export default router
