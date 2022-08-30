"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const charactersRoutes_1 = __importDefault(require("./charactersRoutes"));
const router = (0, express_1.Router)();
router.use('/characters', charactersRoutes_1.default);
exports.default = router;
