// creating server

//1 import express
const express = require('express');

//import data service
const dataservices = require('./services/data.servie');

//import cors
const cors = require('cors');

//import jwt
const jwt = require('jsonwebtoken');

//2 create an application using express
const app = express();

//to parse json data from request body
app.use(express.json());

//give command to share data via cors
app.use(cors({
    origin: ['http://localhost:4200', 'http://172.20.10.2:8080', 'http://127.0.0.1:8080']
}));
//3 create port number
app.listen(3000, () => {
    console.log('listening to port 3000');
})
    ;
//application specific middleware
const appMiddleware = (req, res, next) => {
    console.log('application specific middleware');
    next();
}
app.use(appMiddleware);

//router specific middleware
const jwtMiddleware = (req, res, next) => {
    try {
        console.log('router specific middleware');
        const token = req.headers['token'];
        const data = jwt.verify(token, 'superkey2022');
        console.log(data);
        next();
    } catch {
        res.status(422).json({
            statusCode: 422,
            status: false,
            message: 'please login first'
        })
    }
}

//4 resolve http request --get post put delete patch

//resolving get req
app.get('/', (req, res) => {
    res.send('get request');
})
//node index.js and localhost:3000 on browser

//resolving post req
app.post('/', (req, res) => {
    res.send('post request');
})

//put req
app.patch('/', (req, res) => {
    res.send('patch request')
});

//delete req
app.delete('/', (req, res) => {
    res.send('delete request');
})

//put
app.put('/', (req, res) => {
    res.send('put request');
})

//for bank app we should define requestd like 
// registration,
// login,
// deposit 
// withdarw 
// transaction and 
// delete request,

//register
app.post('/register', (req, res) => {
    console.log(req.body);
    dataservices.register(req.body.username, req.body.account, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result);
        })
});

//transaction
app.post('/transaction', jwtMiddleware, (req, res) => {
    console.log(req.body);
    dataservices.getTransaction(req.body.account)
        .then(result => {
            res.status(result.statusCode).json(result);
        })

})

//login
app.post('/login', (req, res) => {
    console.log(req.body);
    dataservices.login(req.body.account, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result);
        })

})

//withdraw
app.post('/withdraw', jwtMiddleware, (req, res) => {
    dataservices.withdraw(req.body.account, req.body.password, req.body.amount)
        .then(result => {
            res.status(result.statusCode).json(result);
        })

})

//deposite
app.post('/deposite', jwtMiddleware, (req, res) => {
    dataservices.deposit(req.body.account, req.body.password, req.body.amount)
        .then(result => {
            res.status(result.statusCode).json(result);
        })

})

//delete request
app.delete('/delete/:account', jwtMiddleware, (req, res) => {
    dataservices.deleteAccount(req.params.account)
        .then(result => {
            res.status(result.statusCode).json(result);
        })
})