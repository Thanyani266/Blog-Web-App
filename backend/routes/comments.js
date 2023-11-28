// Importing required libraries
const express = require('express')

const { getComments, createComment, deleteComment, updateComment, getComment } = require('../controllers/commentsController')

// Comments router
const router = express.Router({ mergeParams: false });

// Comments routes
router.get('/comments', getComments)
router.post('/comment', createComment)
router.get('/comment/:comment_id', getComment)
router.delete('/comments', deleteComment)
router.put('/comment/:comment_id', updateComment)
//router.get('/post/:id', getRelatedPost)

module.exports = router