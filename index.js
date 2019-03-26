'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const Schema = mongoose.Schema;
const fs = require('fs');

//const cates = require('./schemas/cat');
const CatInfo = new Schema({
    name: String,
    cat_age: Number,
    gender: String,
    color: String,
    weight: Number
});

const Cates = mongoose.model('Cates', CatInfo);

console.log(process.env);

// Connect to mongodb
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}/admin`).then(() => {
    console.log('Connected successfully.');
    app.listen(process.env.APP_PORT);
}, err => {
    console.log('Connection to db failed: ' + err);
});

app.get('/', (req, res) => {
    Cates.create({ test: 'Hello', more: 7}).then(post => {
        console.log(post.id);
        res.send('Created dummy data? ' + post + Cates);
    })
});

app.get('/all', (req, res) => {
   Cates.find().then(all => {
      console.log(all);
      res.send(all);
   });
});

app.post('/add', function (req, res, next) {
   const cat = {
       cat_name: req.body.cat_name,
       cat_age: req.body.cat_age,
       gender: req.body.gender,
       color: req.body.color,
       weight: req.body.weight
   };

    fs.writeFile('data.json', JSON.stringify(myJson), "utf8", Cates);
    myJson = require ('public/data.json');

   /*
   dbase.collection("name").save(name, function(err, result){
       if(err){
           console.log(err);
       }
    res.send('name added successfully');
   });
   */
    res.sendStatus(200);
});

app.get('/name', function (req, res){
   dbase.collection('name').find().toArray(function (err, results) {
       res.send(results);
   })
});

Cates.create({hidden: false}).then(post => {
   console.log('create ' + post.id);
});

