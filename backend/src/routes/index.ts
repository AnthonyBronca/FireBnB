import express, { NextFunction, Request, Response } from "express";
import path from 'path'
const router = require('express').Router();

import apiRouter from './api'


router.use('/api', apiRouter);

router.use(express.static(path.join(__dirname, "dist")));
router.use(express.static(path.join(__dirname, 'dist/assets/favicon.ico')));


router.get("/api/csrf/restore", (req:Request, res:Response, next: NextFunction) => {
  const csrfToken = req.csrfToken();
  res.cookie("XSRF-TOKEN", csrfToken);
  res.status(200).json({
    'XSRF-Token': csrfToken
  });
});

//send the react build as a static file
router.get('/', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
//send the react build as a static file
router.get('/favicon.ico', (_req:Request, res:Response) => {
  res.sendFile(path.join(__dirname, '/favicon.ico'));
});

export = router;
