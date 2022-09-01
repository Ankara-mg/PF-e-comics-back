"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const controller_publishers_1 = require("../controller/controller.publishers");
const router = Router();
router.get('/', controller_publishers_1.getPublishers);
exports.default = router;
