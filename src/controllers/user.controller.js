import {asyncHandler} from '../utils/asyncHandler.js';
import {User} from '../models/user.models.js';
import {uploadCloudinary} from '../utils/fileUpload.js';
import { apiResponse } from '../utils/apiResponse.js';   

const registerUser=asyncHandler(async(req,res)=>{
   const{fullname,email,username,password}=req.body
   console.log("email",email)
   if(!fullname || !email || !username || !password){
       res.status(400);
       throw new Error("All fields are required");
   }
   const existedUser=await User.findOne({
      $or:[{username},{email}]
   })
   if(existedUser){
       res.status(409);
       throw new Error("User already exists");
   }
   const avatarLocalPath= req.files?.avatar?.[0]?.path;
   const coverImageLocalPath= req.files?.coverImage[0]?.path;
   if(!avatarLocalPath || !coverImageLocalPath){
       res.status(400);
       throw new Error("Avatar fields are required");
   }
 const avatar =  await uploadCloudinary(avatarLocalPath);
 const coverImage = await uploadCloudinary(coverImageLocalPath);
 if(!avatar || !coverImage){
     res.status(500);
     throw new Error("Something went wrong");
 }
 const user = await User.create({
     fullname,
     email,
     username,
     password,
     avatar:avatar.url,
     coverImage:coverImage.url
 })
 const created_user= await User.findbyId(user._id).select("-password -refreshToken");
 if(!created_user){
     res.status(500);
     throw new Error("Something went wrong with created_user");
 }
 return res.status(201).json(new apiResponse(201,"User created successfully",{user:created_user}));
})

export {registerUser}