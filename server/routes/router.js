const axios = require('axios');

const express = require('express');
const userController = require('../controller/UserController')

const route = express.Router();

route.get('/',(req,res)=>{
    axios.get('http://localhost:3000/api/users')
    .then((response)=>{    
        res.render('index',{users:response.data});
    })
    .catch(error=>{
        res.send(error);
    })
});
route.get('/add-user',(req,res)=>{
    res.render('add_user');
})
route.get('/update-user',(req,res)=>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
})

//API
route.post('/api/users',userController.createUser);
route.get('/api/users',userController.getUser);
route.put('/api/users/:id',userController.updateUser);
route.delete('/api/users/:id',userController.deleteUser);


module.exports = route;