"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const charactersRoutes = require('./routes/charactersRoutes');
const router = (0, express_1.Router)();
router.get('/characters', charactersRoutes);
module.exports = router;
