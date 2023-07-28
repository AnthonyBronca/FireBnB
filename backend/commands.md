Create a User migration

```sh
npx sequelize model:generate --name User
--attributes firstname:string,lastname:string,
username:string,email:string,bio:text,hashedPassword:string,profileImg:string
```

Create Spot migration

````sh
npx sequelize model:generate --name Spot
--attributes address:string,zipcode:integer,city:string,state:string,spotType:string,description:text,lat:integer,long:integer,userid:integer,available:boolean```
````
