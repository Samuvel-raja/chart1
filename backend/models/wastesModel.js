const mongoose=require('mongoose');

const wasteModel=new mongoose.Schema(
    {
        start_date:
        {
            type:String,
            required:true
        },
        end_date:
        {
            type:String,
            required:true
        },
        fyear:
        {
           type:mongoose.Schema.Types.ObjectId,
           ref:'year'
        },
        type:
        {
            type:String,
            enum:["generated","disposed","recovered"],
            required:true
        },
        quantity:
        {
            type:Number,
            required:true
        },
        category:
        {
            type:String,
            required:true
        },
        organization:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'organization'
        }
    }
)
module.exports=mongoose.model('waste',wasteModel);