// Importing libraries
const fsPromises = require('fs').promises
const path = require('path')
const { v4 : uuid } = require('uuid')

// Setting the posts data in our local database
const data = {
    posts: require('../models/posts.json'),
    setPosts: function (data) { this.posts = data}
}

// Getting the posts data
const getPosts = (req, res) => {
    res.json(data.posts)
}

// Creating a new post
const createPost = async (req, res) => {
    // Form data values
    const post = {
        title: req.body.title,
        description: req.body.description,
        file: req.file.filename,
        category: req.body.category,
        username: req.body.username
    }
    
    const newPost = {...post, id: uuid(), modified: new Date()};
    data.setPosts([...data.posts, newPost])
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'posts.json'),
        JSON.stringify(data.posts)
    );
    res.status(201).json(data.posts) // 201 ==> created new record
    //const post = req.body
    //posts.push()
    //res.send("Post added successfully")
}

// Getting single post based on the post id
const getPost = (req, res) => {
    const singlePost = data.posts.filter(post => post.id === req.params.id)
    res.send(singlePost)
}

// Function to delete the post
const deletePost = async (req, res) => {
    posts = data.posts.filter(post => post.id !== req.params.id)
    data.setPosts([...posts])
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'posts.json'),
        JSON.stringify(data.posts)
    );
    res.send("Post deleted successfully")
}

// Function to edit the post
const updatePost = async (req, res) => {
    const post = data.posts.find(post => post.id === req.params.id)

    post.title = req.body.title;
    post.description = req.body.description;
    post.category = req.body.category;

    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'posts.json'),
        JSON.stringify(data.posts)
    );

    res.send("Post updated successfully")
}

module.exports = { getPosts, createPost, getPost, deletePost, updatePost }