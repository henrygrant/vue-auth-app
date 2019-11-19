const {BlogPost} = require('../models')

module.exports = {
    async getBlogPosts (req, res) {
        try {
            const blogPosts = await BlogPost.findAll({
              attributes: {

              }
            })
            res.send(blogPosts.toJSON())
        } catch (err) {
            res.status(400).send({
                error: 'Error fetching blogs.'
            })
        }
    }
}