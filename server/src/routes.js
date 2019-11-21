const AuthenticationController = require('./controllers/AuthenticationController')
const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')
const BlogPostController = require('./controllers/BlogPostController')

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
    app.post('/blogs',
        BlogPostController.post
    )
}
