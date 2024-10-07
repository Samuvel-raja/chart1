const mongoose=require('mongoose');

const organizationModel=new mongoose.Schema(
    {
        organization:
        {
            type:String
        },
        address:
        {
            type:String
        }
    }
)
module.exports=mongoose.model("organization",organizationModel);