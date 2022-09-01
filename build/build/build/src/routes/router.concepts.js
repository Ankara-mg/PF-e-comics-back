"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const controller_concepts_1 = require("../controller/controller.concepts");
const router = Router();
router.get('/', controller_concepts_1.getConcepts);
exports.default = router;
