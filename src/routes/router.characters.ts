const { Router } = require('express');
import {getCharacters, } from '../controller/controller.characters'
const router = Router();

router.get('/', getCharacters )

// router.use('/:id', controllerUser.getusers )

export default router;