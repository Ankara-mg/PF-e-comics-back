import express from "express";
import routes from './src/routes/index'
//import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
// import { dotenv } from "dotenv";


//----------

//import morgan from 'morgan';

const app = express();

//cors:

//midlewares:

//----------


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
//app.use(cookieParser());
//app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/' ,routes )

export default app;