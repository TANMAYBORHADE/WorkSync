

const cloudinary = require('../config/cloudinary')

const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "auto" 
        })
        return {
            url: result.secure_url,
            publicId: result.public_id,
            resourceType: result.resource_type
        }
    } catch (error) {
        console.error('Error while uploading to cloudinary', error)
        throw new Error('Error while uploading to cloudinary')
    }
}

module.exports = uploadToCloudinary;