const express=require('express');
const { getAllWaters, updateWater, deleteWater, createWater, deleteAllWaters, getSingleWater } = require('../controllers/waterController');

const waterRouter=express.Router();
waterRouter.get('/',getAllWaters);
waterRouter.put('/:id',updateWater);
waterRouter.delete('/:id',deleteWater);
waterRouter.post('/',createWater);
waterRouter.delete('/',deleteAllWaters);
waterRouter.get('/:id',getSingleWater)

module.exports=waterRouter;