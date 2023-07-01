let userModel = require("../models/user.model")
let jwt = require("jsonwebtoken")
const displayWelcome = (req,res)=>{
    res.send("welcome user")
}
const registerUser = (req,res)=>{
    console.log(req.body)
    let userData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email : req.body.email,
        password : req.body.password
    }
    let form = new userModel(userData)
    form.save()
    .then(()=>{
        console.log("saved successfully")
        res.send({status:true,message:"signup was successful"})
    })
    .catch((err)=>{
        console.log("could not save")
        console.log(err)
        res.send({status:false,message:"signup was not successful"})
    })
}

const signin = (req,res)=>{
    console.log(req.body)
    let {email,password} = req.body
    userModel.findOne({email:email})
    .then((user)=>{
        console.log(user)
        if(!user){
            res.send({status:false,message:"user not found"})
        }else{
            let secret = process.env.SECRET
            user.validatePassword(password,(err,same)=>{
                if(!same){
                    res.send({status:false,message:"wrong credentials"})
                }else{
                    let token = jwt.sign({email},secret,{expiresIn:'7h'})
                    console.log(token)
                    res.send({status:true,message:"welcome",token})
                }
            })
            console.log("hurray, user exists")
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}

const getDashboard = (req,res)=>{
    let token = req.headers.authorization.split(" ")[1];
    let secret = process.env.SECRET
    jwt.verify(token,secret,(err,result)=>{
        if(err){
            console.log(err)
            res.send({status:false,message:""})
        }else{
            // userModel.findOne({email:result.email})
            res.send({status:true,message:"welcome",result})
            console.log(result.email)
        }
    })

}
module.exports = {displayWelcome,registerUser,signin,getDashboard}