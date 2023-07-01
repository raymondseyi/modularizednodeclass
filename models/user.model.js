const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
let studentSchema = mongoose.Schema({
    firstname : {type:String, required:true},
    lastname : {type:String, required:true},
    email: {type:String,required:true,unique:true},
    password : {type:String,required:true},
    registrationDate : {type:Date,default:Date.now()}
})

let saltRound = 10

studentSchema.pre("save",function(next){
    console.log(this.password)
    bcrypt.hash(this.password,saltRound,(err,hashedPassword)=>{
        console.log(hashedPassword)
        if(err){
            console.log(err)
        }else{
            this.password = hashedPassword
            next()
        }
    })
    // bcrypt.hash(password,saltRound,callback)
})

studentSchema.methods.validatePassword = function(password,callback){
    bcrypt.compare(password,this.password,(err,same)=>{
        if(!err){
            callback(err,same)
        }else{
            next()
        }
    })
}
let studentModel = mongoose.model("student",studentSchema);

module.exports = studentModel;