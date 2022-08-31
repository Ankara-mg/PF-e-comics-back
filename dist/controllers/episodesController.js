"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComics = void 0;
const axios_1 = __importDefault(require("axios"));
const getComics = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comics = [];
        let listSeries = `https://comicvine.gamespot.com/api/series_list/?api_key=49e9caca6b1b3b836f076299d5a84df4e9ab60a1&format=json`;
        let dataList = yield axios_1.default.get(listSeries);
        // console.log(dataList)
        dataList.data.results.map((e) => {
            return comics.push({
                name: e.name,
                id: e.id,
                image: e.image.original_url,
                description: e.deck,
                release: e.date_added.slice(' '),
                episodes: e.count_of_episodes
            });
        });
        console.log(comics);
        return comics;
    }
    catch (error) {
        console.log(error);
    }
});
exports.getComics = getComics;
console.log((0, exports.getComics)());
