// Importing libraries
const fsPromises = require('fs').promises
const path = require('path')
const { v4 : uuid } = require('uuid')

// Setting the comments data in the json file
const data = {
    comments: require('../models/comments.json'),
    setComments: function (data) { this.comments = data}
}

// Getting the comments data for active single post
const getComments = (req, res) => {
    const comments = data.comments?.filter(comment => comment.post_id === req.query.post_id)
    res.json(comments)
}

// Adding a new comment
const createComment = async (req, res) => {
    // Form data values
    const commentValues = {
        comment: req.body.comment,
        username: req.body.username
    }

    const newComment = {...commentValues, comment_id: uuid(), post_id: req.query.post_id, date: new Date()};
    data.setComments([...data.comments, newComment])
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'comments.json'),
        JSON.stringify(data.comments)
    );
    res.status(201).json(data.comments) // 201 ==> created new record
    //const post = req.body
    //posts.push()
    //res.send("Post added successfully")
}

// Getting single comment based on the id
const getComment = (req, res) => {
    console.log(req.params.comment_id)
    const singleComment = data.comments.filter(comment => comment.id === req.params.comment_id)
    res.send(singleComment)
}

// Function to delete the comment
const deleteComment = async (req, res) => {
    console.log('QUERY: ' +req.query.comment_id);
    comments = data.comments.filter(comment => comment.comment_id != req.query.comment_id)
    data.setComments([...comments])
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'comments.json'),
        JSON.stringify(data.comments)
    );
    res.send("Comment deleted successfully")
}

// Function to edit the comment
const updateComment = async (req, res) => {
    const commentRow = data.comments.find(comment => comment.id === req.params.comment_id)

    commentRow.comment = req.body.title;

    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'comments.json'),
        JSON.stringify(data.comments)
    );

    res.send("Comment updated successfully")
}




module.exports = { getComments, createComment, getComment, deleteComment, updateComment }