const uploadToCloudinary = require('../helpers/cloudinary-helper');
const Image = require('../models/Image')
const fs = require('fs')


const uploadImageController = async(req,res)=>{
    try{
        if(!req.file){
            return res.status(400).json({
                success:false,
                message:'File is required!'
            })
        }

        const{url, publicId} = await uploadToCloudinary(req.file.path)

        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy:req.userInfo.userId
        })
        newlyUploadedImage.save();
        fs.unlinkSync(req.file.path);
        res.status(201).json({
            success:true,
            message:'Image uploaded successfully',
            image:newlyUploadedImage
        })


    }catch(error){
        // console.log(error);
        res.status(500).json({
            success:false,
            message:'Something went wrong! Please try again'
        })
    }
}


const fetchImageController = async(req,res)=>{
    try{
        const images = await Image.find({})
        if(images){
            res.status(200).json({
                success:true,
                data:images
            })
        }
        
    }catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:'Something went wrong! Please try again'
        })
        
    }
}

module.exports = {uploadImageController,fetchImageController};
