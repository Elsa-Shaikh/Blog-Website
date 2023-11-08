import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';

const url = process.env.DATABASE_URL
const storage = new GridFsStorage({
    url: `${url}`,
     options: {useUnifiedTopology:true,useNewUrlParser: true},
    file: (request, file) => {
        const match = ["image/png","image/jpg"];
        if(match.indexOf(file.mimeType) === -1) {
            return `${Date.now()}-blog-${file.originalname}`;
        }
        return {
            bucketName: "photos",
            filename:`${Date.now()}-blog-${file.originalname}`
        }
    }
})
 export default multer({ storage });
// const upload = multer({ storage });
// export default upload;
