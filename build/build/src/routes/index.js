"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const router_characters_1 = __importDefault(require("./router.characters"));
const episodesRoutes_1 = __importDefault(require("./episodesRoutes"));
const router_concepts_1 = __importDefault(require("./router.concepts"));
const router_publishers_1 = __importDefault(require("./router.publishers"));
const router = Router();
router.use('/characters', router_characters_1.default);
router.use('/comics', episodesRoutes_1.default);
router.use('/concepts', router_concepts_1.default);
router.use('/publishers', router_publishers_1.default);
exports.default = router;
