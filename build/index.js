"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("./models"));
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 3000;
models_1.default.sequelize.sync({ force: false }).then(() => {
    app_1.default.listen(port, () => {
        // getComics
        // getCharacters
        console.log(`App listening on port ${port}`);
    });
});
