const express=require('express');
const router=express.Router();
const User=require('../models/User')
const { body, validationResult } = require('express-validator');

const bcrypt=require("bcryptjs");

const jwt=require("jsonwebtoken");
const jwtSecretkey="MynameisPrashantKumarIdontknowwhattodo"
router.post("/createuser",[
    body('email').isEmail(),
    body('name').isLength({min: 5}),
    body('password').isLength({min: 5})
]
,async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
      
    let salt=await bcrypt.genSalt(10);
    let securePass=await bcrypt.hash(req.body.password,salt);
    try{
        await User.create({
            name:req.body.name,
            password:securePass,
            email:req.body.email,
            location:req.body.location
            
        })
        console.log("data is added");
        res.json({sucess:true});
    } catch(err){
        console.log(err);
        res.json({sucess:false});
    }
    
})




router.post("/loginuser",[
    body('email').isEmail(),
    body('password').isLength({min: 5})
]
,async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  let email=req.body.email;
    try{
        let userData=await User.findOne({email})
        if(!userData){
            res.status(400).json({error:"try Login with correct credentials"})
        }
        
        const pwdCompare=bcrypt.compare(req.body.password,userData.password);

        if(!pwdCompare)
            {
                res.status(400).json({error:"try Login with correct credentials"})
            }

        const data={
            user:{
                id:userData.id
            }
        }
       const authToken=jwt.sign(data,jwtSecretkey)
       return(res.json({sucess:true,authToken:authToken}));
    } catch(err){
        console.log(err);
        res.json({sucess:false});
    }
    
})

module.exports=router;