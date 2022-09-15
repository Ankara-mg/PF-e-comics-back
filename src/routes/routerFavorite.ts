const { Router } = require('express');
import { getFavDb, postFavs, remuveFav } from "../controller/controller.fav";

const router = Router();

router.get('/:userId', getFavDb )
router.post('/', postFavs)
router.delete('/', remuveFav)



export default router;