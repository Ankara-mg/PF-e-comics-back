import db from "./models";
import app from "./app";


const port = process.env.PORT || 3000;
db.sequelize.sync({ force: false }).then(()=>{
    
    app.listen(port,()=>{
        console.log(`App listening on port ${port}`)
    })
})