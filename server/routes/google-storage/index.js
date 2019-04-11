const routes = require('express').Router()
const Multer = require('multer');
const gcsMiddlewares = require('../../middlewares/google-cloud-storage')
const User = require('../../models/user')  
  const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    },
  });
  
  routes.post(
    '/upload',
    multer.single('image'),
    gcsMiddlewares.sendUploadToGCS,
    (req, res, next) => {
      if (req.file && req.file.gcsUrl) {
        console.log(req.file.gcsUrl)
       return User.findByIdAndUpdate({
          _id : req.headers.id
        },{
          gcsLink: req.file.gcsUrl
        },{
          new : true
        })
        .then((user => {
          res.status(200).json(user)
        }))
        .catch(err => {
          res.status(500).json(err)
        })
      }
      return res.status(500).send('Unable to upload');
    },
  );

module.exports = routes