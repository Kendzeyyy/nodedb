'use strict';
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.enable('trust proxy');
const Schema = mongoose.Schema;
const fs = require('fs');

console.log(process.env);

// Connect to mongodb
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}/admin`).then(() => {
    console.log('Connected successfully.');
    app.listen(process.env.APP_PORT);
}, err => {
    console.log('Connection to db failed: ' + err);
});

app.use ((req, res, next) => {
    if (req.secure) {
        // request was via https, so do no special handling
        next();
    } else {
        // request was via http, so redirect to https
        res.redirect('https://' + req.headers.host + req.url);
    }
});

app.get('/', (req, res) => {
    Cates.create({ test: 'Hello', more: 7}).then(post => {
        console.log(post.id);
        res.send('Created dummy data? ' + post + Cates);
    })
});

// get all cats
app.get('/all', (req, res) => {
    catController.cat_list_get().then((result) => {
        res.send(result);
    });
});

app.post('/new', bodyParser.urlencoded({extended: true}), (req, res) => {
    const data = req.body;
    console.log(data);
    catController.cat_create_post(data).then((result) => {
        res.send(result);
    });
});

app.get('/number', (req, res) => {
    catController.cat_number_get().then((result) => {
        res.send(`Got ${result} cats`);
    });
});

app.get('/sort', (req, res) => {
    catController.cat_sort_get().then((result) => {
        let text = '';
        result.forEach((cat) => {
            text += cat.name + '<br>';
        });
        res.send(text);
    });
});

app.get('/name', function (req, res){
    dbase.collection('name').find().toArray(function (err, results) {
        res.send(results);
    })
});