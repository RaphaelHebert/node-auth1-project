// Require `checkUsernameFree`, `checkUsernameExists` and `checkPasswordLength`
// middleware functions from `auth-middleware.js`. You will need them here!
const { checkUsernameFree, checkUsernameExists, checkPasswordLength } = require('./auth-middleware')
const express = require('express')
const Model = require('../users/users-model')
const router = express.Router()
const bcrypt = require('bcryptjs')

router.post('/register', checkUsernameFree, checkPasswordLength, async (req, res, next) => {
  try{
    const newUser = await Model.add({username: req.body.username, password: req.body.password})
    res.status(200).json(newUser) 
  } catch (err) {
    next(err)
  }
})

router.post('/login', checkUsernameExists, async (req, res, next) => {
  try{
    const [ user ] = await Model.findBy(req.body.username)
    if(user && bcrypt.compareSync(req.body.password, user.password)) {
      req.session.user = user; //send cookie to client
      res.status(200).json({
        message: `Welcome ${user.username}`
      })
    } else {
      res.status(401).json({
        message: "Invalid credentials"
      })
    }
  } catch (err) {
    next(err)
  }
})

router.get('/logout', (req, res, next) => {
  if(req.session) {
    req.session.destroy(err => {
      if(err){
        res.status(200).json({ message: err.message })
      } else {
        res.status(200).json({ message: "logged out" })
        next(err)
      }
    })
  } else {
    res.status(200).json({message: "no session"})
  }
})
/**
 * 
  3 [GET] /api/auth/logout

  response for logged-in users:
  status 200
  {
    "message": "logged out"
  }

  response for not-logged-in users:
  status 200
  {
    "message": "no session"
  }
 */

 
module.exports = router