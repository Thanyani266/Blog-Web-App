// Importing required libraries
const express = require('express')
const app = express()
const multer = require('multer')
const { getPosts, createPost, getPost, deletePost, updatePost } = require('../controllers/postsController')

// Posts router
router = express.Router()

// Specifying the image storage path and adding a filename
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname)
    }
})

// Upload the image to the storage mentioned above
const upload = multer({storage: fileStorageEngine})

// Posts routes
router.get('/posts', getPosts)
router.post('/post', upload.single('file'), createPost)
router.get('/post/:id', getPost)
router.delete('/post/:id', deletePost)
router.put('/post/:id', updatePost)

module.exports = router