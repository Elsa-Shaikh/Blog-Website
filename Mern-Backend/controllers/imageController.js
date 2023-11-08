import grid from 'gridfs-stream';
import mongoose from 'mongoose';

const url = 'http://localhost:5000/api';

const connection = mongoose.connection;
let gfs,gridfsBucket;

connection.once('open',()=>{
    gridfsBucket = new mongoose.mongo.GridFSBucket(connection.db,{
        bucketName:'fs'
    });
    gfs = grid(connection.db,mongoose.mongo);
    gfs.collection('fs');
})


export const uploadImage = async (req, res) => {
    console.log(req.file);
    if(!req.file){
        return res.status(404).json({msg:'File not Found!'});
    }

    const imageURL = `${url}/file/${req.file.filename}`;
    return res.status(200).json(imageURL);
}

export const getImage = async (req, res) => {
   try{
    const file = await gfs.files.findOne({
        filename:req.params.filename
    });
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
   }
   catch(error){
    return res.status(500).json({msg:error.message})
   }
}

