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
exports.getCharacters = void 0;
//@ts-nocheck
//import { Request, Response } from 'express';
// import { pool } from '../database';
//import { QueryResult } from 'pg';
const { API_KEY } = process.env;
const axios_1 = __importDefault(require("axios"));
const getCharacters = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCharacters = [];
        let apidata = `https://comicvine.gamespot.com/api/characters/?api_key=49e9caca6b1b3b836f076299d5a84df4e9ab60a1&format=json`;
        let characters = yield axios_1.default.get(apidata);
        characters.data.results.map((char) => {
            return allCharacters.push({
                id: char.id,
                name: char.name,
                description: char.deck,
                image: char.image.original_url,
                // origin: char.origin.name    //? char.origin.name : "Desconocido"
                // isAvaliable: true,
                // price: 
            });
        });
        return allCharacters;
    }
    catch (e) {
        console.log(e);
    }
});
exports.getCharacters = getCharacters;
