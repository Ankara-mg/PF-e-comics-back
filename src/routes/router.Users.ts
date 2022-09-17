import { Router } from 'express';
import { userSignup, userLogin, } from '../controller/controller.users';
import { verifyToken } from '../middleware/middleware';

const router = Router()



router.post('/signup', async (req, res) => {
  const { username, email, password, } = req.body
  try {
    let controller = await userSignup(username, email, password)
    res.json(controller)
  } catch (error: any) {
    res.status(500).json({ error: error.message })
  }

})

router.post('/login', userLogin)

//router.get ('/me', verifyToken, verificar)
export default router
