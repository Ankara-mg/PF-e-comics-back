import express from "express";
import routes from './src/routes/index'
//import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
//import morgan from 'morgan';
import cors from 'cors'
const app = express();

//cors:
app.use(cors({origin:'*'}))
//midlewares:
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
//app.use(cookieParser());
//app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use('/' ,routes )

export default app;



// import express from "express";
// import routes from './src/routes/index'
// //import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';
// //import morgan from 'morgan';
// import { auth } from "express-openid-connect";
// import path from "path";
// const app = express();
// import cors from 'cors'

// //cors:

// // app.set('views', path.join(__dirname, 'views'));
// // app.set('view engine', 'pug');
// // app.use(express.static(path.join(__dirname, '..', 'public')));
// // app.use(
// //   auth({
// //     issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
// //     baseURL: process.env.BASE_URL,
// //     clientID: process.env.AUTH0_CLIENT_ID,
// //     secret: process.env.SESSION_SECRET,
// //     authRequired: false,
// //     auth0Logout: true,
 
// //   }),
// // );

// //midlewares:

// app.use(cors({origin:'*'})),
// app.use(express.json());
// app.use(express.urlencoded({extended: false}));

// app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
// app.use(bodyParser.json({ limit: '50mb' }));
// //app.use(cookieParser());
// //app.use(morgan('dev'));
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:4200'); // update to match the domain you will make the request from
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   next();
// });

// app.use('/' ,routes )

// export default app;