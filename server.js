import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import knex from 'knex';

import handlePostSigin from './controllers/signin.js';
import handlePostRegister from './controllers/register.js';
import handleGetProfile from './controllers/profile.js';
import { handlePostImageUrl, handlePutImage } from './controllers/image.js';

console.log(process.env.PORT);

const database = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  }
});

const app = express();
const jsonParser = express.json();

app.use(cors());

app.get('/', (req, res) => {res.json("This is working.");} );
app.post('/signin', jsonParser, (req, res) => handlePostSigin(req, res, database, bcrypt) );
app.post('/register', jsonParser, (req, res) => handlePostRegister(req, res, database, bcrypt) );
app.get('/profile/:id', (req, res) => handleGetProfile(req, res, database) );
app.post('/imageUrl', jsonParser, (req, res) => handlePostImageUrl(req, res) );
app.put('/image', jsonParser, (req, res) => handlePutImage(req, res, database) );

app.listen(process.env.PORT || 3000, () => {
  console.log(`This app is running at ${process.env.PORT}`);
});
