const express=require('express');
const homeRouter=express.Router();
const verifyUserWithToken = require("../auth/verifyUser");

homeRouter.get('/',verifyUserWithToken,(req,res)=>
{
    return res.send(req.user);
});

module.exports=homeRouter;