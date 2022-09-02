"use strict";
//@ts-nocheck
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
exports.getDetails = void 0;
const axios_1 = __importDefault(require("axios"));
const apiKey = '49e9caca6b1b3b836f076299d5a84df4e9ab60a1';
const getDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        let api = yield axios_1.default.get(`https://comicvine.gamespot.com/api/series/4075-${id}/?api_key=${apiKey}&format=json`);
        const apiData = api.data.results;
        if (apiData.length > 0) {
            const comicDetail = {
                id: apiData.id,
                name: apiData.name,
                deck: apiData.deck ? apiData.deck : apiData.name,
                episodes: apiData.episodes.map(e => e.name),
                image: apiData.image.original_url,
                publisher: apiData.publisher.name,
                release_year: apiData.start_year,
            };
            res.send(comicDetail);
        }
        else
            throw "No se encontro ese comic";
    }
    catch (e) {
        res.send(e);
    }
});
exports.getDetails = getDetails;
