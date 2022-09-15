//@ts-nocheck
import { Router } from 'express';
import { users_db, setRolUser,setActiveUser } from '../controller/Controller.admin';

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

router.put("/users/rol", async (req, res) => {
  const { id_user, rol } = req.body
  try {
    let controller = await setRolUser(id_user, rol)
    res.json(controller)
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
})

router.put("/users/active", async (req, res) => {
  const { id_user, active } = req.body
  try {
    let controller = await setActiveUser(id_user, active)
    res.json(controller)
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
})




export default router