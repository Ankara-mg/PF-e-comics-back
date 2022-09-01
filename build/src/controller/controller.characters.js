"use strict";
//@ts-nocheck
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
exports.getCharactersDB = exports.getCharacters = void 0;
const models_1 = __importDefault(require("../../models"));
const axios_1 = __importDefault(require("axios"));
const apiKey = '49e9caca6b1b3b836f076299d5a84df4e9ab60a1';
const getCharacters = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCharacters = [];
        let apidata = `https://comicvine.gamespot.com/api/characters/?api_key=${apiKey}&format=json`;
        let characters = yield axios_1.default.get(apidata);
        characters.data.results.map((char) => {
            // console.log('DESC LENGTH', char.deck.length)
            return allCharacters.push({
                id: char.id,
                name: char.name,
                description: char.deck,
                image: char.image.original_url,
                gender: char.gender,
            });
        });
        yield models_1.default.Characters.bulkCreate(allCharacters);
        res.send(allCharacters);
    }
    catch (e) {
        console.log(e);
    }
});
exports.getCharacters = getCharacters;
const getCharactersDB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allCharacters = yield models_1.default.Characters.findAll();
    const character = allCharacters.map((char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            image: char.image
        };
    });
    console.log("soy esta funcion");
    res.send(character);
});
exports.getCharactersDB = getCharactersDB;
