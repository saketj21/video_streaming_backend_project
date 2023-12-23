import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME , 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadCloudinary = async (file) => {
    try{
      if(!file) return null;
      const result = await cloudinary.uploader.upload(file,{
            resource_type:"auto",
        });
        //console.log("file uploaded succesfully",result);
        fs.unlinkSync(file);
        return result;
    }
    catch(error){
        fs.unlinkSync(file);
        return null;
    }
}

export {uploadCloudinary}