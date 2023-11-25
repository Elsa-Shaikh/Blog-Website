// import multer from 'multer';
// import { GridFsStorage } from 'multer-gridfs-storage';

// const url = process.env.DATABASE_URL
// const storage = new GridFsStorage({
//     url: 'mongodb://localhost:27017/BlogWebsite',
//     //  options: {useUnifiedTopology:true,useNewUrlParser: true},
//     file: (request, file) => {
//         const match = ["image/png","image/jpg"];
//         if(match.indexOf(file.mimetype) === -1) {
//             return `${Date.now()}-blog-${file.originalname}`;
//         }
//         return {
//             bucketName: "photos",
//             filename:`${Date.now()}-blog-${file.originalname}`
//         }
//     }
// })
 
// export default multer({ storage });

import multer from 'multer';

//image storage path
const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}.${file.originalname}`);
    }
})
// image filter
const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith('image')){
        callback(null,true)
    }else{
        callback(new Error("Only Image is Allowed!"))
    }
}

const upload = multer({
    storage:imgconfig,
    fileFilter:isImage
})

export default upload;