const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const BlogPostController = require('./controllers/BlogPostController')
const UserController = require('./controllers/UserController')
const GoogleSheetsController = require('./controllers/GoogleSheetsController')
const FileUploadController = require('./controllers/FileUploadController')

const config = require('./config/config')
const multer = require('multer')
const multerGoogleStorage = require('multer-google-storage')
const uploadHandler = multer({
  storage: multerGoogleStorage.storageEngine(config.blogImages)
})

module.exports = app => {
  app.post('/register',
    AuthenticationControllerPolicy.register,
    AuthenticationController.register
  )
  app.post('/login',
    AuthenticationController.login
  )

  app.get('/blogs',
    BlogPostController.get
  )
  app.post('/blogs', uploadHandler.any(),
    BlogPostController.post
  )
  app.delete('/blogs/:blogId',
    BlogPostController.delete
  )

  app.get('/users',
    UserController.get
  )
  app.put('/users/:userId',
    UserController.put
  )
  // app.post('/users',
  //     UserController.post
  // )
  // app.delete('/users',
  //     UserController.delete
  // )
  //
  app.get('/gamers',
    GoogleSheetsController.getCached
  )

  app.post('/imageupload', 
    uploadHandler.single('file'),
    FileUploadController.post
  )
}
