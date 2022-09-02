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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublishers = void 0;
const models_1 = __importDefault(require("../../models"));
const axios_1 = __importDefault(require("axios"));
const apiKey = '49e9caca6b1b3b836f076299d5a84df4e9ab60a1';
const getPublishers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allPublishers = [];
        let apidata = `https://comicvine.gamespot.com/api/publishers/?api_key=${apiKey}&format=json&limit=4`;
        let publishers = yield axios_1.default.get(apidata);
        publishers.data.results.map((char) => {
            return allPublishers.push({
                name: char.name,
                image: char.image.original_url,
                city: char.location_city
            });
        });
        yield models_1.default.Publishers.bulkCreate(allPublishers);
        res.send(allPublishers);
    }
    catch (e) {
        console.log(e);
    }
});
exports.getPublishers = getPublishers;
