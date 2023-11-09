const express = require('express');
const app = express();
const fileupload=require('express-fileupload');

app.use(express.json());

app.use(fileupload({
  useTempFiles:true,
  tempFileDir:'/tmp/'
}));

const db=require('./config/Database');
db.connect();

const cloudinary=require('./config/cloudinary');
cloudinary.cloudinaryConnect();

const upload=require('./routes/FileUpload');
app.use('/api/v1/upload',upload);

app.listen(3000, function() {
  console.log("Server running on port 3000.");
});