const express=require('express');
const {createBatch,deleteBatch, getAllBatches} = require('../controllers/batchController');
const batchRouter=express.Router();

batchRouter.post('/',createBatch);
batchRouter.delete('/',deleteBatch);
batchRouter.get('/',getAllBatches);

module.exports=batchRouter;