import express from 'express';
require('express-async-errors');
import morgan from 'morgan';
import cors from 'cors';
import csurf from 'csurf';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import routes from './routes';

const {environment} = require('./config');

const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
// app.use(csurf())

app.use(routes);

if(!isProduction){
    app.use(cors());
}

app.use(
    helmet.crossOriginResourcePolicy({
        policy: 'cross-origin'
    })
);



app.use(
    csurf({
        cookie: {
            secure: isProduction,
            //maybe change this to isProduction later
            sameSite: false && "Lax",
            httpOnly: true
        }
    })
)


export = app;
