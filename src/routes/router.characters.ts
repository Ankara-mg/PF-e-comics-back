const { Router } = require('express');
import {getCharactersDB, getCharacters } from '../controller/controller.characters'
const router = Router();

router.get('/', getCharactersDB, getCharacters )

// router.use('/:id', controllerUser.getusers )

export default router;