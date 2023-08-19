#!/usr/bin/env node

// Import environment variables
// require('dotenv').config();

import dotenv from 'dotenv';
dotenv.config();

import config from '../config'

import app from '../app'

import db from '../db/models';



// const app = require('../app');
// const db = require('../db/models');

// // Check the database connection before starting the app
db.sequelize
  .sync()
  .then(() => {
    console.log('Database connection success! Sequelize is ready to use...');

//     // Start listening for connections
    app.listen(config.port, () => console.log(`Listening on port ${config.port}...`));
  })
  .catch((err:any) => {
    console.log('Database connection failure.');
    console.error(err);
  });
