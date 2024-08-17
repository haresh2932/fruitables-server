const multer = require("multer")
const fs = require("fs")
const path=require("path")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fieldname = file.fieldname
    const Path = path.join('public',fieldname) 

    fs.mkdir(Path, { recursive: true },(err)=>{
      if(err){
        cb(err,null)
      }
 
      cb(null, Path)
    })
    
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })
module.exports = upload