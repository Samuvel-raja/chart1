const express=require('express');
const userRouter=express.Router();
const {createUser,updateUser,getAllUsers,deleteUser} =require('../controllers/userController')

userRouter.get('/',getAllUsers);
userRouter.put('/:id',updateUser);
userRouter.post('/',createUser);
userRouter.delete('/:id',deleteUser);

module.exports=userRouter;