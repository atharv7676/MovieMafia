import multer, { diskStorage } from "multer"


//configuration only
const storage = multer.diskStorage({
    destination : (req, res, cb)=>{
        cb(null, "uploads/");
    },
    filename : (req, res, cb)=>{
        cb(null, Date.now()+"-"+File.originalname)
    }
})

//usage

const upload = multer({
    storage
})

export default upload