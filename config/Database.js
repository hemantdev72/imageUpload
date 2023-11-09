const mongoose=require('mongoose');

exports.connect=()=>{
    mongoose.connect('mongodb://127.0.0.1:27017/fileupload',{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(console.log('db connection sucessfull'))
    .catch((err)=>{
        console.log('db connection failed');
        console.error(err);
        process.exit(1);
    });
}