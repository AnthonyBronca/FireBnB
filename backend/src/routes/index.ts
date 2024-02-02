import express, { NextFunction, Request, Response } from "express";
import path from 'path';

const router = express.Router()

import apiRouter from './api'


router.use('/api', apiRouter);


//apply middleware to allow for usage of static react app from build
// console.log(path.join(__dirname, "../react-app"), "***")
router.use(express.static(path.join(__dirname, "../react-app")));
router.use(express.static(path.join(__dirname, '../react-app/assets/favicon.ico')));

//send the react build as a static file
router.get('/', (req: Request, res: Response, _next: NextFunction) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.sendFile(path.join(__dirname, "../index.html"));
});
//send the react build as a static file
router.get('/favicon.ico', (_req: Request, res: Response, _next: NextFunction) => {
  res.sendFile(path.join(__dirname, '/favicon.ico'));
});

router.get(/^(?!\/?api).*/, (req: Request, res: Response) => {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.sendFile(path.resolve(__dirname, '../react-app/index.html'))
})


// if(process.env.NODE_ENV !== 'production'){
  router.get("/api/csrf/restore", (req: Request, res: Response, next: NextFunction) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
      'XSRF-Token': csrfToken
    });
  });
// }

export = router;
