import express from 'express'
const app  = express();

import indexRoutes from './routes/index'
//midleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/', indexRoutes )

export default app;