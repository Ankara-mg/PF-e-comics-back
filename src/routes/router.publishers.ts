const { Router } = require('express');
import { getPublishers } from "../controller/controller.publishers";


const router = Router();

router.get('/', getPublishers )


export default router;

//probando rutas commit