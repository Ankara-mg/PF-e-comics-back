const { Router } = require('express');
import {getCharactersDB } from '../controller/controller.characters'
const router = Router();

router.get('/', getCharactersDB )

// router.use('/:id', controllerUser.getusers )

export default router;