// Import libraries
const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const { handleNewUser, handleLogin, userInfo, handleRefreshToken, handleLogout, verifyUser } = require('../controllers/usersController')

const app = express()
// User Router
router = express.Router()

// User routes
router.get('/refresh', handleRefreshToken)
router.post('/register', handleNewUser)
router.post('/login', handleLogin)
router.get('/logout', handleLogout)
router.get('/user', userInfo)
//router.delete('/post/:id', deletePost)
//router.put('/post/:id', updatePost)

module.exports = router