var Userdb = require('../model/model')

//create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({message: "Content can not be empty"})
        return;
    }

    // new user
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    // save user in the database
    user   
        .save(user)
        .then(data => {
            // res.send(data)
            res.redirect('/add_user')
        })
        .catch(err=>{
            res.status(500).send({
                message: err.message || "some error occurred while creating a create operation"
            })
        })
}

//retrieve and return all uses / retrieve and return a single user
exports.find=(req,res)=>{

    if(req.query.id){
        const id = req.query.id

        Userdb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message: "Not found user with id" + id})
                }else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({message:"Error retrieving user with id" + id})
            })
    }else{
        Userdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.send(500).send({message:err.message || "Error occurred while retrieving"})
        })
    }
}

// update a new identified user by user id in the request
exports.update = (req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({message: "data to update can not be empty"})
    }

    const id = req.params.id
    Userdb.findByIdAndUpdate(id, req.body, {useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(404).send({message: `cannot update user with ${id}. Maybe user is not found`})
            }
            else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error updating user information"})
        })
}

// delete a user with specific user id in the request
exports.delete= (req,res)=>{
    const id = req.params.id;

    Userdb.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"cannot delete with id ${id}. Maybe id is not found"})
            }else{
                res.send({message: "user was deleted successfully!"})
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:"could not delete user with id =" + id
            })
        })
}