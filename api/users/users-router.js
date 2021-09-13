const { restricted } = require('../auth/auth-middleware')
const Model = require('./users-model')
const express = require('express')
const router = express.Router()

router.get('/', restricted,  async (req, res, next) => {
  try {
    const user = await Model.find()
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
})

module.exports = router

