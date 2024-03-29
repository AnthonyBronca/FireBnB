# FireBnB

## Navigation
[Live Site](https://firebnb-5js9.onrender.com/)

[API Docs](https://github.com/AnthonyBronca/FireBnB/wiki)

[Portfolio](https://anthonybronca.github.io/anthony_portfolio/)

[Airbnb](https://www.airbnb.com/)


## Overview
Firebnb is a full-stack clone of Airbnb. 
Firebnb has a web based component utilizing PERN (PostgreSQL, Expres.js, React, Node.js).
Firebnb also has a mobile based component utilizing React-Native, Redux, Axios, Express.js, and Node.js. 
Both projects utilize Typescript across the entire stack.

The project aims to replicate the user experience and design of Airbnb's mobile and web applications, while utilizing modern technologies and best practices.


### Team:
- [Anthony Bronca](https://github.com/AnthonyBronca)
- [Krystal Kimmel](https://github.com/kryskimmel)
- [Alexi Bettinger](https://github.com/OGAlexi)

### DockerImage:
API image: `docker.io/anthonybronca/firebnb-api:latest`
Deployed image: `docker.io/anthonybronca/firebnb`

### Tech Stack:
[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&pause=500&color=007acc&width=435&lines=TypeScript;Express;Sequelize;React;Redux;PostgreSQL;SQLite3;Docker;HTML5;CSS3)](https://git.io/typing-svg)

- Frontend: React with TypeScript, ensuring type safety and maintainability.
- Mobile: React-Native with Typescript, ensuring type safety and maintainability.
- Backend: Node.js and Express.js, utilizing TypeScript for server-side development.
- Database: PostgreSQL for efficient relational data storage and retrieval.
- Authentication: Implementing secure authentication using industry-standard practices such as hashing and CSRF.
- DevOps: Docker for containerized deployment utilizing multi-stage images, and Amazon Web Services for Image storage.

![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React-Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Mocha](https://img.shields.io/badge/mocha.js-323330?style=for-the-badge&logo=mocha&logoColor=Brown)
![Sequelize](https://img.shields.io/badge/sequelize-323330?style=for-the-badge&logo=sequelize&logoColor=blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Shell Scripting](https://img.shields.io/badge/Shell_Script-121011?style=for-the-badge&logo=gnu-bash&logoColor=white)
![SQLite3](https://img.shields.io/badge/SQLite3-00000F?style=for-the-badge&logo=sqlite3&logoColor=white)
![Amazon AWS](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Github Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)

### Features
- Pixel-Perfect Design: Crafted with attention to detail, Firebnb provides a seamless and visually appealing experience, mimicking the aesthetic of Airbnb.
- Mobile and Web based applications
- User Authentication: Secure user authentication and authorization system to ensure data privacy and protection.
- Property Listings: Users can browse through a comprehensive list of property listings with detailed information, high-quality images, and interactive maps.
- Booking System: Implementing a robust booking system, allowing users to easily book properties for specified dates.
- User Reviews and Ratings: Enable users to leave reviews and ratings for properties, contributing to a dynamic and trustworthy community-driven platform.
- Responsive Design: Ensuring a consistent and optimal user experience across various devices and screen sizes.

### How to Clone

1. Clone this project. You can also clone a specific branch using:
`git clone --branch <branchname> `

2. Set up Postgres:
   - Ensure you have [Post Bird](https://github.com/Paxa/postbird) installed
   - Create a Postgres database running the following commands in the terminal:
   ```sh
   psql -c "CREATE USER <username> WITH PASSWORD '<password>'"
   ```
   ```sh
   psql -c "CREATE DATABASE <databasename>"
   ```
3. Create a `.env` file in the backend folder and fill it out to match the .env.example file
4. Run `npm install` in the backend
5. Run `npm start` to build your migrations, seed data, and get the api started
6. In the Frontend directory, run `npm install`
7. Then run `npm start`

*Note: For AWS S3 storage, you will also need to follow the below steps*

1. Make an account on AWS
2. Make a bucket with a unique name. Make sure to disable ALCs
3. Make an IAM User for this project
4. Add custom policy and apply this .json value:
```js
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1420751757000",
      "Effect": "Allow",
      "Action": ["s3:*"],
      "Resource": "arn:aws:s3:::<NAME OF BUCKET>/*"
    }
  ]
}
```
5. Attach the policy to the IAM User
6. Add security to your User and grab the API key and Secret key to fill in the .env file within the `/backend` folder of this project.

For more detailed instructions please see this repo:

[AWS PERN Demo Repo]("https://github.com/jdrichardsappacad/aws-s3-pern-demo")

#### Acknowledgments
- Inspired by Airbnb
- Icons by Font Awesome
