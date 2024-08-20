const cloudinary = require("cloudinary").v2


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDNARY_NAME,
    api_key: process.env.CLOUDNARY_KEY,
    api_secret: process.env.CLOUDNARY_SECRET_KEY // Click 'View Credentials' below to copy your API secret
});

const uploadFile = async (localPath, folderName) => {
    // Upload an image
    try {
        const uploadResult = await cloudinary.uploader
            .upload(
                localPath,
                {
                    folder: folderName
                }
            )
            .catch((error) => {
                console.log(error)
            });

        console.log(uploadResult);

        return uploadResult

    } catch (error) {

    }
}



module.exports=uploadFile