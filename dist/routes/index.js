"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const index_controller_1 = require("../controllers/index.controller");
router.get('/characters', index_controller_1.getCharacters);
exports.default = router;
