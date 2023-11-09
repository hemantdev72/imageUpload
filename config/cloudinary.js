const cloudinary=require('cloudinary');

exports.cloudinaryConnect=()=>{
    try{
        cloudinary.config({
            cloud_name:'dnec5gkbq',
            api_key:'885911325214769',
            api_secret:'jKInOmHHRhuJYnnHZsEtv5Tn0YI'
        })
    } catch(err){
        console.log(err);
    }
}