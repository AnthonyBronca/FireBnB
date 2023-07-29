import express from 'express';
require('express-async-errors');
import morgan from 'morgan';
import cors from 'cors';
const csurf = require('csurf')
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
                sameSite: isProduction && "Lax",
            httpOnly: true
        }
    })
    )

app.use(routes);




export = app;
