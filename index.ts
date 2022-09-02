import db from "./models";
import app from "./app";
// import { Request, Response, NextFunction } from "express";
// import { getComics } from "./src/controller/episodesController"
// import { getCharacters} from './src/controller/controller.characters'

// import { Request, Response, NextFunction } from "express";
// import {getPublishers} from './src/controller/controller.publishers'
// import { getComics } from "./src/controller/episodesController";
// import { getConcepts } from "./src/controller/controller.concepts";
// import { getCharacters } from "./src/controller/controller.characters";



const port = process.env.PORT || 3000;
db.sequelize.sync({ force: false }).then(async()=>{
    app.listen(port,()=>{
        // getPublishers()
        // getComics()
        // getConcepts()
        // getCharacters()
        
        console.log(`App listening on port ${port}`)
    })
})


