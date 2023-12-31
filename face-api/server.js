const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');
const dotenv = require('dotenv');
dotenv.config();



const register = require('./Controller/register');
const signin = require('./Controller/signin');
const profile = require('./Controller/profile');
const image = require('./Controller/image');

const db = knex({
  client: 'pg',
  connection: {
    host : process.env.DATABASE_URL,
    port : process.env.DATABASE_PORT,
    user : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : process.env.DATABASE
    // host: '192.168.50.154',
    // port: 5432,
    // user: 'app',
    // password: '',
    // database: 'faceapp'

  }
});



const app = express();

app.use(cors());
app.use(bodyParser.json());



// app.get('/', (req, res) => { res.send('It Works') })
app.post('/signin', (req, res) => signin.handleSignIn(req, res, db, bcrypt))
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db));
app.put('/image', (req, res) => image.handleImage(req, res, db));
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})


app.listen(process.env.PORT || 3001, ()=> {
  console.log(`app is running on port ${process.env.PORT}`);
})


