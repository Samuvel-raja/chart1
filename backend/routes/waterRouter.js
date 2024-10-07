const express=require('express');
const { getAllWaters, updateWater, deleteWater, createWater, deleteAllWaters } = require('../controllers/waterController');

const waterRouter=express.Router();
waterRouter.get('/',getAllWaters);
waterRouter.put('/:id',updateWater);
waterRouter.delete('/:id',deleteWater);
waterRouter.post('/',createWater);
waterRouter.delete('/',deleteAllWaters);

module.exports=waterRouter;