"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const controller_characters_1 = require("../controller/controller.characters");
const router = Router();
router.get('/', controller_characters_1.getCharactersDB, controller_characters_1.getCharacters);
// router.use('/:id', controllerUser.getusers )
exports.default = router;
