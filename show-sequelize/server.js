// import express from 'express';
const express = require('express');
// import bodyParser from 'body-parser';
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
// import path from 'path';
const path = require('path');
// Models
const Shop = require('./models').Shop;
const Coffee = require('./models').Coffee;

// Test Shop & Coffee
// Shop.create({
//     name: 'Starfucks'
// }).then(shop => {
//     // Once the shop was created
//     shop.createCoffee({
//         name: "Veracruzano",
//         type: "toasted"
//     }).then(() => {
//         console.log("It worked!");
//     }).catch(err => {
//         console.log('Error on createCoffee', err.message);
//     });
// }).catch(err => {
//     console.log('Error on createShop: ', err.errors[0].message);  
// });
// List All Coffess
// Shop.findAll({
//     include: [Coffee]
// }).then(shops => {
//     console.log(shops);
// }).catch(err => {
//     console.log('Error on getting all shops: ', err);  
// });

// App Server Object
const app = new express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) ;
// parse application/json
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    Shop.findAll({
        include: [Coffee]
    }).then(shops => {
        res.render('index', { shops: shops });
    }).catch(err => {
        console.log('Error on getting all shops: ', err); 
    });
});

app.post('/shops', (req, res) => {
    Shop.create(req.body)
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));
})

app.post('/coffee/:shop_id', (req, res) => {
    // name : value
    Coffee.create({...req.body, 
        ShopId: req.params.shop_id
    }).then(() => {
        res.redirect('/');
    }).catch(err => console.log(err));
});

// handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.listen(5000, () => console.log('Listen on port 5000'));