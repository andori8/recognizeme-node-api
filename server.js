const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const signin = require('./controllers/signin');
const register = require('./controllers/register');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Mcgrady1.',
    database : 'postgres'
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

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where({ id: id}).then(user => {
    if (user.length) {
      res.json(user[0])  
    } else {
      res.status(400).json("Not found")
    }
  })
  .catch(err => res.status(400).json("error getting user"))
})

app.put('/image', (req, res) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0])
  })
  .catch(err => res.status(400).json("unable to get entries"))
})

app.listen(3001)
