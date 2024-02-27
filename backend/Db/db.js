const mongoose = require('mongoose')
const { Schema } = require('zod')
const URI ="mongodb://127.0.0.1:27017/paytm"


const connectionDB = async () =>{
    try {
        const connectionInstance = await mongoose.connect(URI)
        console.log(`Connected Successfully : ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection error",error)
        process.exit(1)
    }
}


const userScheme = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:16
       },
    firstName:{
        type:String,
        require:true,
        trim:true,
        maxLength:50
    },
    lastName:{
        type:String,
        maxLength:50,
        trim:true,
    },
    password:{
        type:String,
        require:true,
        minLength:6
    }

    
})
const  accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    balance:{
        type:Number,
        require:true
    }

})
const Account = mongoose.model("Account", accountSchema)
 const User = mongoose.model("User",userScheme)
module.exports ={
    User,
    Account,
    connectionDB
}



