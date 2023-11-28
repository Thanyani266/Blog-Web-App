// Required Libraries
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const postsRoutes = require('./routes/posts')
const usersRoutes = require('./routes/users')
const commentsRoutes = require('./routes/comments')

const cookieParser = require('cookie-parser')
const path = require('path')

const app = express()
const port = 5000;

// Body parser middleware
app.use(bodyParser.json());

// Allow request from the specified origin only
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

// cookie-parser middleware
app.use(cookieParser());

// built-in middleware to handle json data 
app.use(express.json())

// built-in middleware to handle static data 
app.use(express.static('images'))

// Routes for users and posts 
app.use('/', postsRoutes)
app.use('/', usersRoutes)
app.use('/', commentsRoutes)

// Routes
app.get('/', (req, res) => res.send("Hello from express server"));
app.all('*', (req, res) => res.send("That route doesn't exist"));

// Bind and listen to the connections on the specified host and port.
app.listen(port, () => console.log(`Server is listening on port: ${port}`));