const mongoose=require('mongoose');

const userSchema=new mongoose.Schema(
    {
        username:
        {
            type:String,
            required:true
            
        },
        email:
        {
            type:String,
            unique:true,
            required:true
        },
        password:
        {
            type:String,
            required:true
        },
        organization:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"organization",
            required:true
        },
        role:
        {
            type:String,
            enum:["user","admin"],
            default:"user",
            required:true
        },
        token:
        {
            type:String
        }
    }
    
)

module.exports=mongoose.model('user',userSchema);