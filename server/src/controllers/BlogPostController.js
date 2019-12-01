const {BlogPost} = require('../models')
const {User} = require('../models')

module.exports = {
  async get (req, res) {
    try {
      const blogPosts = await BlogPost.findAll({
        include: [
          {
            model: User
          }
        ]
      })
      res.send(blogPosts)
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Error fetching blogs.'
      })
    }
  },
  async post (req, res) {
    try {
      let blogPost = await BlogPost.create(req.body)
      blogPost = blogPost.toJSON()
      const user = await User.findOne({
        where: {
          id: blogPost.UserId
        }
      })
      blogPost.User = user.toJSON()
      res.send(blogPost)
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Error posting blog.'
      })
    }
  },
  async delete (req, res) {
    try {
      console.log(req.body)
      let deletedBlog = await BlogPost.destroy({
        where: { id: req.body.id }
      })
      res.send(deletedBlog.toJSON())
    } catch (err) {
      console.log(err)
      res.status(400).send({
        error: 'Error posting blog.'
      })
    }
  }
}