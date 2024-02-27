const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {User,Account} = require('../Db/db')
const zod = require('zod')
const {JWT_SECRET} = require('../config')
const {authMiddleware} = require('../middlewares/middleware.js')


const signUpBody = zod.object({
    username:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
    password: zod.string()

})

router.post('/signup',async (req,res)=>{
    console.log("Request Body :",req.body)
    console.log("I am agt right place")
    const {success,error } = signUpBody.safeParse(req.body)

    if(!success){
        return res.status(411).json({
            message:"Invalid inputs",
            error:error
        })  
    }

    const existingUser = await User.findOne({
        username:req.body.username
    })

    if(existingUser){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user =await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })

    const userId = user._id;

    await Account.create({
        userId,
        balance: (Math.random()*1000)+1
    })

    const token = jwt.sign({
        userId
    },JWT_SECRET)

    res.status(200).json({
        message:"User created Successfully",
        token:token
    })
})

const signInBody = zod.object({
    username : zod.string(),
    password: zod.string()
})


router.post('/signin',async (req,res)=>{
    const {success,error} = signInBody.safeParse(req.body)

    if(!success){
        return  res.status(411).json({
            message:"Inputs invalid",
            error:error
        })
    }

    const user = await User.findOne({
        username:req.body.username,
        password:req.body.password
    })

    if(user){
        const token =jwt.sign({
            userId:user._id
        },JWT_SECRET)

        res.json({
            token:token
        })
        return
    }
    

    res.status(411).json({
        message: "Error while logging in"
    })

})

const updateBody =zod.object({
     firstName : zod.string().optional(),
     password:zod.string().optional(),
     lastName:zod.string().optional()
})
router.put("/",authMiddleware,async (req,res)=>{
    const {success} = updateBody.safeParse(req.body)

    if(!success){
        res.status(411).json({
            message:"Error while updating information"
        })
    }

    await User.updateOne(req.body,{
        _id:req.userId
    })  

    res.json({
        message:"updated successfully"
    })



})

router.get('/bulk',authMiddleware, async (req,res)=>{
    const filter = req.query.filter || "";
    console.log('bulk')
    const users = await User.find({
        $or:[{
                firstName:{"$regex": filter}
            },
            {
                lastName:  {"$regex": filter}
            }
            ]
    })

    if(!users){
        res.json({
            message:"User does not found"
        })
    }
    res.json({
        user: users.map((user)=>({
            username: user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id: user._id
        }))
    })

})
module.exports =router