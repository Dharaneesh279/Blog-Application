const express = require('express');
const router = express.Router();
const Post  = require('../models/Post');
const User  = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = '../views/layouts/admin';


//get home 
//admin router-login

router.get('/admin', async(req,res) =>{
    try {   
        const locals = {
            title: "Admin",
            description: "A simple Blog API built with Node.js and Express.js"
        }
        res.render('admin/index',{locals,layout: adminLayout});
    } catch (error) {
        console.log(error);
    }
});

//post 
//admin check login

router.post('/admin', async(req,res) =>{
    try {
        const {username,password} = req.body;
         
    } catch (error) {
        console.log(error);
    }
});


// router.post('/admin', async(req,res) =>{
//     try {
//         const {username,password} = req.body;
//         if(req.body.username === 'admin' && req.body.password === 'password'){
//             res.send('You are logged in');
//         }
//         else{
//             res.send('Invalid username or password');
//         }
//     } catch (error) {
//         console.log(error);
//     }
// });








//post 
//admin regiser

router.post('/register', async(req,res) =>{
    try {
        const {username,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        try{
             const user = await User.create({username, password: hashedPassword});
             res.status(201).json({message: 'User created',user});
        }catch(error){
            res.status(400).json({message: 'Error creating user'});
        }
        res.status(500).json({message: 'Server error'});
    } catch (error) {
        console.log(error);
    }
});




module.exports = router;