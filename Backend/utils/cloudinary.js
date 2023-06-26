const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const cloudinaryUploadImg = async (file2Upload) => {
    return new Promise((resolve) => {
        cloudinary.uploader.upload(file2Upload, (result) => {
            resolve(
                {
                    url: result?.secure_url,
                    asset_id: result?.asset_id,
                    public_id: result?.public_id,
                },
                {
                    resource_type: "auto",
                }
            );
        });
    });
};

const cloudinaryDeleteImg = async (file2Delete) => {
    return new Promise((resolve) => {
        cloudinary.uploader.destroy(file2Delete, (result) => {
            resolve(
                {
                    url: result?.secure_url,
                    asset_id: result?.asset_id,
                    public_id: result?.public_id,
                },
                {
                    resource_type: "auto",
                }
            );
        });
    });
};



module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };