const routes = require('express').Router()
const Multer = require('multer');
const gcsMiddlewares = require('../../middlewares/google-cloud-storage')
const UserController = require('../../controllers/UserController')
const authenticate = require('../../middlewares/authenticate')

const multer = Multer({
    storage: Multer.MemoryStorage,
    limits: {
      fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
    },
  });
  
  routes.post(
    '/upload',
    multer.single('image'), authenticate,
    gcsMiddlewares.sendUploadToGCS, UserController.uploadImage
  );

module.exports = routes