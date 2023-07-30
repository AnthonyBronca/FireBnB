import express, {Request, Response, NextFunction} from 'express';
require('express-async-errors');
import morgan from 'morgan';
import cors from 'cors';
const csurf = require('csurf')
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import routes from './routes';
import { NoResourceError, SequelizeErrors } from './typings/errors';
import { ValidationError } from 'sequelize';

const {environment} = require('./config');

const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());


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

//catch request that can't be found
app.use((_req,_res, next)=> {
    const err: NoResourceError = new Error("The requested resource could not be found.");
    err.title = "Resource Not Found";
    err.errors = [{message: "The requested resource couldn't be found."}];
    err.status = 404;
    next(err);
});

//catch sequelize specific errors (eg: formatting)
app.use((err:SequelizeErrors, _req:Request ,_res: Response, next: any): any => {
    let errors:any = {};
    for(let error of err.errors){
        errors.message = error.message;
        console.log(error)
    }
    err.title = 'Validation Error';
    err.errors = errors
    next(err);

});

//error formatter
app.use((err: any , _req: Request, _res: Response, _next:any) => {
    _res.status(err.status || 500);
    console.error(err);
    _res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    });
});



export = app;
