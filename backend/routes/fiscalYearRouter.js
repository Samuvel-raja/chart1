const express=require('express');
const { creatYears, getAllYears } = require('../controllers/fiscalYearController');

const yearRouter=express.Router();

yearRouter.post('/',creatYears);
yearRouter.get('/',getAllYears);

module.exports=yearRouter;