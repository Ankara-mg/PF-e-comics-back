"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            }
        }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_details_1 = require("../controller/controller.details");
const episodesController_1 = require("../controller/episodesController");
const router = (0, express_1.Router)();
router.get('/', episodesController_1.getComics);
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () { (0, controller_details_1.getDetails)(req, res); }));
router.post('/', episodesController_1.postComics);
router.get('/:name', episodesController_1.SearchName);
exports.default = router;
