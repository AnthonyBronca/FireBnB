#!/usr/bin/env node

// Import environment variables
require('dotenv').config();

const { port } = require('../../dist/config');

const app = require('../app');
const db = require('../db/models');

// Check the database connection before starting the app
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection success! Sequelize is ready to use...');

    // Start listening for connections
    app.listen(port, () => console.log(`Listening on port ${port}...`));
  })
  .catch((err:any) => {
    console.log('Database connection failure.');
    console.error(err);
  });
