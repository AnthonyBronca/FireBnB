import express, {NextFunction, Request, Response} from 'express';
require('express-async-errors');
import morgan from 'morgan';
import cors from 'cors';
import csurf from 'csurf';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ValidationError } from 'sequelize';
import { SequelizeError, NoResourceError } from './errors/customErrors';
import routes from './routes'
// const routes = require('./routes');
const { environment } = require('./config');
const isProduction = environment === 'production';


const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
}

// helmet helps set a variety of headers to better secure your app
app.use(
    helmet.crossOriginResourcePolicy({
        policy: "cross-origin"
    })
    );

// Set the _csrf token and create req.csrfToken method
app.use(
    csurf({
        cookie: {
            secure: isProduction,
            sameSite: isProduction && "lax",
            httpOnly: true
        }
    })
);

app.use(routes);


app.use((_req:Request, _res:Response, next:NextFunction) => {
    const err = new NoResourceError("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors?.push({ message: "The requested resource couldn't be found." });
    err.status = 404;
    next(err);
});

// Process sequelize errors
app.use((err:NoResourceError, _req:Request, _res:Response, next:NextFunction):void => {
  // check if error is a Sequelize error:
    let errors: any = {};

    if(err.errors instanceof Array){
        for (let error of err.errors) {
            if(error.path){
                errors[error.path] = error.message;
            }
        }
    }
    // err.title = 'Validation error';
    // err.errors = errors;
  next(err);
});

// // Error formatter

app.use((err:NoResourceError, _req:Request, res:Response, _next:NextFunction):void => {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    title: isProduction? null : err.title? err.title: 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
});

export = app;
