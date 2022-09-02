import db from "./models";
import app from "./app";
// import { Request, Response, NextFunction } from "express";
// import { getComics } from "./src/controller/episodesController"
// import { getCharacters} from './src/controller/controller.characters'

const port = process.env.PORT || 3000;
db.sequelize.sync({ force: false }).then(async ()=>{

    app.listen(port,()=>{
        // getComics
        // getCharacters
        console.log(`App listening on port ${port}`)
    })
})
