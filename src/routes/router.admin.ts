//@ts-nocheck
import { Router } from 'express';
import { users_db, setActiveUser, setRolUser } from '../controller/Controller.admin';
import { getAllRatings, removeRating } from '../controller/controller.raiting';
import { sendMailService } from '../controller/controller.mailing';

const router = Router()

// Rutas para dashboard
router.get("/", (req, res) => {
  res.json("admin")
})

router.get("/users", async (req, res) => {
  try {
    let controller = await users_db()
    res.json(controller)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put("/users/rol", async (req, res) => {
  const { id_user, rol } = req.body
  try {
    let controller = await setRolUser(id_user, rol)
    res.json(controller)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.put("/users/active", async (req, res) => {
  const { id_user, active } = req.body
  try {
    let controller = await setActiveUser(id_user, active)
    res.json(controller)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


router.put("/users/active", async (req, res) => {
  const { id_user, active } = req.body
  try {
    let controller = await setActiveUser(id_user, active)
    res.json(controller)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/reviews", async (req, res) => {
  const { id_user, active } = req.body
  try {
    let controller = await getAllRatings(id_user, active)
    res.json(controller)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


router.delete("/reviews", async (req, res) => {
  const { id_review } = req.body
  try {
    let controller = await removeRating(id_review)
    res.json(controller)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})


router.post("/sendEmail", async (req, res) => {
  const { email } = req.body
  console.log(email);
  
  try {
    let controller = await sendMailService(email)
    res.json(controller)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})




export default router