const { sequelize } = require('./db/models');

console.log(sequelize, "this is sequelize")
sequelize.showAllSchemas({ logging: false }).then(async (data:any) => {
  if (!data.includes(process.env.SCHEMA)) {
    let idk = await sequelize.createSchema(process.env.SCHEMA);
  }
});
