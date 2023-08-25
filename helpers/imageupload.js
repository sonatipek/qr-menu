const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './public/img/');
    },
    filename: (req, file, cb) => {
        cb(null, path.parse(file.originalname).name + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer(
    {storage: storage}
);



module.exports.upload = upload;
