//@ts-nocheck
import { Router } from 'express';
import { users_db } from '../controller/Controller.admin';

const router = Router()

// Rutas para dashboard
router.get("/", (req, res) => {
  res.json("ok")
})

router.get("/users", async (req, res) => {
  try {
    let controller = await users_db()
    res.json(controller)
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
})

// router.get('/me', verifyToken, verificar)

export default router