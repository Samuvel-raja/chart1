const express=require('express');
const { creatYears, getAllYears } = require('../controllers/yearsWaterController');

const yearRouter=express.Router();

yearRouter.post('/',creatYears);
yearRouter.get('/',getAllYears);

module.exports=yearRouter;