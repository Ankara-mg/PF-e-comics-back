import db from "./models";
import app from "./app";

import { getPublishers } from './src/controller/controller.publishers'
import { getComics } from "./src/controller/episodesController";
import { getConcepts } from "./src/controller/controller.concepts";
import { getCharacters } from "./src/controller/controller.characters";
import { createRoles } from "./src/roles/initialRoles";

const port = process.env.PORT || 3000;

db.sequelize.sync({ force: true }).then(async () => {

    app.listen(port, () => {
        getPublishers()
        getComics()
        getConcepts()
        getCharacters()
        createRoles()
        console.log(`App listening on port ${port}`)
    })
})


