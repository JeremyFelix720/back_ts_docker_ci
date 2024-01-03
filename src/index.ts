import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { Sequelize } from 'sequelize';  // Voir : https://sequelize.org/docs/v6/getting-started/

require('dotenv').config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT as string;
const database = process.env.DATABASE as string;
const username = process.env.USERNAME as string;
const password = process.env.PASSWORD as string;
const server = process.env.SERVER as string;

/*
console.log("port = " + port)
console.log("database = " + database)
*/

const sequelize = new Sequelize(database, username, password, {
  host: server,
  dialect: 'postgres',
  dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      },
      dialectModule: require('pg'),
  });

async function connexionTest() {
  try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  
connexionTest();

app.get('/', (req, res) => {
    res.send('Hello world!');
  });

app.listen(port, () => {
  console.log("Express server started on port " + port);
});