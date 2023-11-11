
import express, {NextFunction, Request, Response} from 'express';
import path from 'path'
require('express-async-errors');
import morgan from 'morgan';
import cors from 'cors';
import csurf from 'csurf';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { NoResourceError } from './errors/customErrors';
import routes from './routes'

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


//apply middleware to allow for usage of static react app from build
app.use(express.static(path.join(__dirname, "react-app")));
app.use(express.static(path.join(__dirname, 'react-app/assets/favicon.ico')));

//api routes
app.use(routes);
//send the react build as a static file
app.get('/', (_req: Request, res:Response, _next) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
//send the react build as a static file
app.get('/favicon.ico', (_req, res, _next) => {
    res.sendFile(path.join(__dirname, '/favicon.ico'));
});

        app.use(express.static(path.join(__dirname, 'react-app/assets/favicon.ico')))

        app.use(routes);
        app.get('/', (req: Request, res: Response, _next: NextFunction)=> {
            res.sendFile(path.join(__dirname, "index.html"))
        })
        app.get('/favicon.ico', (req: Request, res: Response, _next: NextFunction)=> {
            res.sendFile(path.join(__dirname, '/favicon.ico'))
        })

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

  next(err);
});

// // Error formatter

app.use((err:NoResourceError, _req:Request, res:Response, _next:NextFunction):Response => {
  res.status(err.status || 500);
  console.error(err);
  return res.json({
    // title: isProduction? null : err.title? err.title: 'Server Error',
    message: err.message,
    errors: err.errors,
    // stack: isProduction ? null : err.stack
  });
});




export = app;
