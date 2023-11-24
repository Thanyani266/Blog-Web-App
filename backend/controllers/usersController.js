// Setting our users local json data
const usersDB = {
    users: require('../models/users.json'),
    setUsers: function (data) { this.users = data }
}

// Importing required libraries
const fsPromises = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// New User Registration
const handleNewUser = async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) return res.status(400).json({"message": "Input Field(s) Empty!"})

    // check for username duplicates in the db
    const duplicate = usersDB.users.find(person => person.username === username || person.email === email)
    if (duplicate) return res.sendStatus(409) // conflict
    try {
        // encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10)
        // store the new user
        const newUser = {'username': username, 'email': email, 'password': hashedPwd}
        usersDB.setUsers([...usersDB.users, newUser])
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'models', 'users.json'),
            JSON.stringify(usersDB.users)
        );
        console.log(usersDB.users);
        res.status(201).json({'success': `New user ${username} created`})
    } catch (err) {
        res.status(500).json({'message': err.message})
    }
}

const handleLogin = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({"message": "Email and Password Required!"})

    const foundUser = usersDB.users.find(person => person.email === email)
    if(!foundUser) return res.send("Email is not valid!"); // unathorized

    // Evaluate password
    const match = await bcrypt.compare(password, foundUser.password)
    if (match) {
        // crate JWTs
        const accessToken = jwt.sign(
            {"email": foundUser.email},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '30s'}
        )
        const refreshToken = jwt.sign(
            {"email": foundUser.email},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        )
        // saving refresh token with current user
        const otherUsers = usersDB.users.filter(person => person.email !== foundUser.email)
        const currentUser = { ...foundUser, refreshToken }
        usersDB.setUsers([...otherUsers, currentUser])
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'models', 'users.json'),
            JSON.stringify(usersDB.users)
        )
        res.cookie('jwt', refreshToken)
        res.json(req.cookies)
    }else{
        res.sendStatus(401)
    }
}

// User logout
const handleLogout = async (req, res) => {
    // On client, also delete the accessToken

    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(204); // No Content
    const refreshToken = cookies.jwt

    // is refreshtoken in db
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken)
    if(!foundUser) {
        res.clearCookie('jwt', refreshToken)//{httpOnly: true, maxAge: 24 * 60 * 60 * 1000})
        return res.sendStatus(204); 
    }

    // Delete the refreshToken in the db
    const otherUsers = usersDB.users.filter(person => person.refreshToken !== foundUser.refreshToken);
    const currentUser = {...foundUser, refreshToken: ''}
    usersDB.setUsers([...otherUsers, currentUser])
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'users.json'),
        JSON.stringify(usersDB.users)
    );
    res.clearCookie('jwt', refreshToken) //{httpOnly: true, maxAge: 24 * 60 * 60 * 1000});   secure: true - only serves on https
    res.sendStatus(204)
}

// Verify the logged on user
const handleRefreshToken = (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt

    // Finding the logged on user
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken)
    if(!foundUser) return res.sendStatus(403); 

    // Evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email != decoded.email) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {"username": decoded.email},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            );
            res.json({ foundUser, accessToken })
        }
    );
}

// Verifying the user
const verifyUser = (req, res, next) => {
    const cookies = req.cookies
    if (!cookies?.jwt) return res.sendStatus(401);
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt

    // Finding the logged user
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken)
    console.log(foundUser)
    if(!foundUser) return res.sendStatus(403); 

    // Evaluate jwt
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.email != decoded.email) return res.sendStatus(403);
            req.email = decoded.email;
            next();
        }
    );
    /*
    jwt.verify(
        refreshToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.sendStatus(403); // invalid token
            req.email = decoded.email;
            req.username = decoded.username;
            next();
        }
    );
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.sendStatus(403); // invalid token
            req.user = decoded.username;
            next();
        }
    ); */
}

// Currently logged user information
const userInfo = (req, res) => { 
    const cookies = req.cookies
    if (!cookies?.jwt) return res.json({"message": "No cookies"});
    console.log(cookies.jwt);
    const refreshToken = cookies.jwt

    // Find the user currently logged on
    const foundUser = usersDB.users.find(person => person.refreshToken === refreshToken)
    console.log(foundUser)
    if(!foundUser) return res.sendStatus(403); 
    res.json(foundUser)
}

module.exports = { handleNewUser, handleLogin, userInfo, handleRefreshToken, handleLogout, verifyUser }