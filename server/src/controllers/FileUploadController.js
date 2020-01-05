module.exports = {
  post (req, res) {
    res.json({ file: req.file })
  }
}