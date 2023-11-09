const mongoose=require('mongoose');
const nodemailer=require('nodemailer');

const fileSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
    },
    tags:String,
    email:String
}); 

//post middleware
// fileSchema.post('save',async function(doc){
//     try{
//          let transporter=nodemailer.transporter({
//             host:smtp.gmail.com,
//             auth:{
//                 user:,
//                 password:,
//             }
//          })
//     } catch(err){

//     }
// })

const File=mongoose.model('File',fileSchema);
module.exports=File;