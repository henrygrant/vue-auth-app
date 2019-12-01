const {User} = require('../models')

module.exports = {
    async get (req, res) {
        try {
            const users = await User.findAll()
            res.send(users)
        } catch (err) {
            res.status(400).send({
                error: 'Error fetching users.'
            })
        }
    },
    async put (req, res) {
        try {
            await User.update(req.body, {
                where: {
                  id: req.params.userId
                }
            })
            res.send(req.body)
        } catch (err) {
            console.log(err)
            res.status(400).send({
                error: 'Error putting user.'
            })
        }
    }
    // async post (req, res) {
    //     try {
    //         let user = await User.create(req.body)
    //         res.send(user.toJSON())
    //     } catch (err) {
    //         console.log(err)
    //         res.status(400).send({
    //             error: 'Error posting user.'
    //         })
    //     }
    // },
    // async delete (req, res) {
    //     try {
    //         console.log(req.body)
    //         let deletedUser = await User.destroy({
    //             where: { id: req.body.id }
    //         })
    //         res.send(deletedUser.toJSON())
    //     } catch (err) {
    //         console.log(err)
    //         res.status(400).send({
    //             error: 'Error deleting user.'
    //         })
    //     }
    // }
}