const cloudinary = require("cloudinary").v2


// Configuration
cloudinary.config({
    cloud_name: "dkpybnqum",
    api_key: "987757292187192",
    api_secret: "09_JTcNQvGxJGfK22PHl1RxiNdU" // Click 'View Credentials' below to copy your API secret
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