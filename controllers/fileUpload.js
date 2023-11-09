const path = require('path'); // Import the 'path' module if not already imported.
const fileUpload = require('express-fileupload'); // Import the file upload middleware if you are using it.
const File = require('../models/File');
const cloudinary=require('cloudinary').v2;

exports.localFileUpload = async (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const file = req.files.file;
        console.log(file);
        const fileName = Date.now().toString(); // Generate a unique filename.

        const uploadPath = path.join(__dirname,fileName)+`.${file.name.split('.')[1]}`;

        file.mv(uploadPath, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'File upload failed' });
            }

            // File was successfully uploaded. You can save additional information to your database here.
            // For example, you can create a new File record in your database.

            return res.status(200).json({ message: 'File uploaded successfully' });
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


        

function isFileTypeSupported(type,support){
    return support.includes(type);
}

async function uploadFileToCloudinary(file,folder,quality){
    const options={folder};
    if(quality){
        options.quality=quality;
    }
    return await cloudinary.uploader.upload(file.tempFilePath,options);
}

exports.imageUpload=async (req,res)=>{
    try{
        const {name,tags,email}=req.body;
        console.log(name,tags,email);
        const file=req.files.imageFile;

        const supportedTypes=['jpg','jpeg','png'];
        const fileType=file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'file not supported'
            })
        }

        const response = await uploadFileToCloudinary(file,'testing'); 
        console.log(response);
        const fileData=await  File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image upload successfully'

        })
        
    }catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message:'Image upload successfully'
        })
    }
}

exports.imageSizeReducer=async(req,res)=>{
    try{
        const {name,tags,email}=req.body;
        console.log(name,tags,email);
        const file=req.files.imageFile;

        const supportedTypes=['jpg','jpeg','png'];
        const fileType=file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType,supportedTypes)){
            return res.status(400).json({
                success:false,
                message:'file not supported'
            })
        }

        const response = await uploadFileToCloudinary(file,'testing',30); 
        console.log(response);
        const fileData=await  File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
        })

        res.status(200).json({
            success:true,
            imageUrl:response.secure_url,
            message:'Image upload successfully'

        })
        
    }catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message:'Image upload successfully'
        })
    }
}