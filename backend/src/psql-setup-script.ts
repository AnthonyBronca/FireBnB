const { sequelize } = require('./db/models');


sequelize.showAllSchemas({ logging: false }).then(async (data:any) => {
  if (!data.includes(process.env.SCHEMA)) {
   await sequelize.createSchema(process.env.SCHEMA);
  }
});
