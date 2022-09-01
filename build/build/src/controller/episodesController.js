"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchName = exports.postComics = exports.getComics = void 0;
const axios_1 = __importDefault(require("axios"));
const models_1 = __importDefault(require("../../models"));
const apiKey = '49e9caca6b1b3b836f076299d5a84df4e9ab60a1';
const getComics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comics = [];
        let listSeries = `https://comicvine.gamespot.com/api/volumes/?api_key=${apiKey}&format=json`;
        let dataList = yield axios_1.default.get(listSeries);
        // console.log(dataList)
        dataList.data.results.map((e) => {
            return comics.push({
                name: e.name,
                id: e.id,
                image: e.image.original_url,
                description: e.deck,
                release: e.date_added.slice(0, 10),
                episodes: e.count_of_episodes
            });
        });
        yield models_1.default.Comics.bulkCreate(comics);
        res.send(comics);
        //    return comics
    }
    catch (error) {
        console.log(error);
    }
});
exports.getComics = getComics;
const postComics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, image, release, description, episodes } = req.body;
    // console.log(req.body)
    try {
        const newComic = yield models_1.default.Comics.create({
            name,
            image,
            release,
            description,
            episodes,
            createInDb: true
        });
        // const characterDb = await db.Characters.findAll({
        //     where: {name : db.Characters}
        // })
        // newComic.addCharacters(characterDb)
        res.status(200).send('El comic fue creado exitosamente😊');
    }
    catch (error) {
        // next()
        console.log(error);
    }
});
exports.postComics = postComics;
const SearchName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    const names = [];
    console.log(names);
    if (name) {
        const url = `https://comicvine.gamespot.com/api/search/?api_key=d1d5b2c8d71b25f222e620d4541b6ac672a05156&format=json&query=${name}&resources=volume&limit=10`; //volume
        console.log(url);
        let datos = yield axios_1.default.get(url);
        datos = datos.data.results.map((e) => {
            let results = {
                name: e.name,
                // description: e.deck,
                // image: e.image.original_url,
                // origin: e.origin.name,
                // publisher: e.publisher.name
            };
            return results;
        });
        res.status(200).send(names);
    }
    else {
        res.status(404).send("No existe name ");
    }
});
exports.SearchName = SearchName;
