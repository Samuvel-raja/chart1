const userModel = require("../models/userModel");
const yearModel = require("../models/yearsWaterModel")


const creatYears=async(req,res)=>
{
    const token=req.cookies.token;
    const user=await userModel.findOne({token});
    const Userorganization=user.organization;
    req.body.organization=Userorganization;
    
    try {
        const newyears=new yearModel(req.body);
        await newyears.save();
        return res.status(200).send({message:"years created successfull"});
    } catch (err) {
        return res.status(404).send(err);
    }
}
const getAllYears=async(req,res)=>
    {
        try {
            const newyears=await yearModel.find().populate('organization');
           return res.status(200).send(newyears)
        } catch (err) {
            return res.status(200).send(err);
        }
    }
module.exports={creatYears,getAllYears};