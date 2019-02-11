const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const profile = require('./controllers/profile');
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : '',
    password : 'Mcgrady1.',
    database : 'recognizeme'
  }
});

db.select('*').from('users').then(data => {
  console.log(data)
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send(database.users)
})

app.post('/signin', (req, res) => { signin.handleSignIn(req,res,db,bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)} )

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req,res,db)})

app.put('/image', (req, res) => { image.handleImage(req,res,db)})

app.listen(3001)
