const express=require('express');
const { createWaste, getAllWastes, updateWaste, deleteWaste } = require('../controllers/wastesController');
const wastesRouter=express.Router();

wastesRouter.get('/',getAllWastes)
wastesRouter.post('/',createWaste)
wastesRouter.put('/:id',updateWaste)
wastesRouter.delete('/',deleteWaste)

module.exports=wastesRouter