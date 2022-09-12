const { Router } = require('express');
import { getFavDb, postFavs, remuveFav } from "../controller/controller.fav";
import  {verifyToken}  from '../controller/verifyToken';

const router = Router();

router.get('/', /*[verifyToken],*/ getFavDb )
router.post('/', postFavs)
router.delete('/', remuveFav)



export default router;