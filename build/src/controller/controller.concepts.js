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
exports.getConcepts = void 0;
const models_1 = __importDefault(require("../../models"));
const axios_1 = __importDefault(require("axios"));
const apiKey = '49e9caca6b1b3b836f076299d5a84df4e9ab60a1';
const getConcepts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allConcepts = [];
        let apidata = `https://comicvine.gamespot.com/api/concepts/?api_key=${apiKey}&format=json&limit=4`;
        let concepts = yield axios_1.default.get(apidata);
        concepts.data.results.map((char) => {
            return allConcepts.push({
                name: char.name,
                description: char.description
            });
        });
        yield models_1.default.Concepts.bulkCreate(allConcepts);
        res.send(allConcepts);
    }
    catch (e) {
        console.log(e);
    }
});
exports.getConcepts = getConcepts;
// export const getconceptsDB = async(req: Request, res:Response) =>{
//     const allConcepts = await db.Concepts.findAll();
//     const concepts = allConcepts.map((char: { id: any; name: any; description: any; image: any; }) => {
//         return {
//         }
//     })
//     res.send(concepts)
//  }
