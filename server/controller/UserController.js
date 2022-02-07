const userDb = require("../model/model");


//Api for crate and save
exports.createUser=(req,res)=>{
    if(!req.body){
        res.status(400).send({message:'content cannot be empty'});
        return;
    }
    const user = new userDb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    });
    console.log(user);
    user.save(user)
    .then(data =>{
        //res.send(data)
        res.redirect('/add-user')
    })
    .catch(err=>{
        res.status(500).send({message:err.message || 'Some error occurs while doing create operation'});
    });
}

exports.getUser = (req,res)=>{
    if(req.query.id){
        const id = req.query.id;

        userDb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })
    }
    else{
        userDb.find()
        .then(user=>{
            res.send(user);
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Error occured while retrieving user information"});
        });
    }
    
}

exports.updateUser = (req,res)=>{
    if(!req.body){
        return res.status(400)
        .send({message:"Data to update cannot be empty"});
    }
    const id = req.params.id;
    userDb.findByIdAndUpdate(id, req.body)
    .then(data=>{
        if(data){
            res.send(data);
        }
        else{
            res.status(404).send({message:`Cannot update user with id ${id}`})
        }
    })
    .catch(error=>{
        res.status(500).send({message:"Error update user information"})
    })
    
}

exports.deleteUser = (req,res)=>{
    const id = req.params.id;

    userDb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}