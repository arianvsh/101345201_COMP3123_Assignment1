const mongoose = require('mongoose')
const express = require('express')

const user_model = require('../models/user_model')

const route = express.Router()

route.post('/user/signup', async(req, res) => {

    if(req.body.content) {
        return res.status(400).send({
            message: "User content cannot be empty"
        });
    }
    try { 
        const user = new user_model(req.body)
        await user.save()
        res.status(201, { message: "Successfully added user"}).send(user)
    }
    catch(error) {
        res.status(500).send(error.message)
    }
})

route.post('/user/login', async(req, res) => {
    if(req.body.content) {
        return res.status(400).send({
            message: "User content cannot be empty"
        });
    }
    let password = req.body.password
    let userName = req.body.username
    const user = await user_model.findOne({username : userName})

    if(!user) {
        res.status(404).send({"message": "Error of authentification"})
    }


    if(userName == user.username && password == user.password) {
        res.status(200).send({"status" : true, "username": user.username, message: "Successfully signed in"})
    }
    else {
        res.status(500).send({status: false, message: "Incorrect username or password"})
    }
})
module.exports = route

