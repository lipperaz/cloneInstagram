const User = require("../models/user");

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const jwtPass = process.env.JWT_PASSWORD;

// Generate user token
const generateToken = (id) => {
    return jwt.sign({ id }, jwtPass, {
        expiresIn: "7d",
    });
};

// Register user and sign in
const register = async(req, res) => {
    
    const {name, email, password} = req.body

    //check
    const user = await User.findOne({email})

    if(user) {
        res.status(422).json({errors: ["Esse email já está cadastrado"]})
        return
    }

    // Generate password
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, salt)

    // Create user
    const newUser = await User.create({
        name,
        email,
        password: hash
    })

    // Successfully, return token
    if (!newUser) {
        res.status(500).json({ errors: ["Erro ao criar o usuário. Tente novamente mais tarde."] });
        return 
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
    });
};

// Sign in
const login = async (req, res) => {
    
    const {email, password} = req.body

    const user = await User.findOne({email})

    // Check exist
    if(!user) {
        res.status(404).json({errors: ["Usuário não encontrado!"]})
        return
    }

    // Check password correct
    if(!(await bcrypt.compare(password, user.password))) {
        res.status(422).json({errors: ["Senha inválida!"]})
        return
    }

    // Return with Token
    res.status(201).json({
        _id: user._id,
        profileImage: user.profileImage,
        token: generateToken(user._id),
    });
}

// Get current user
const getCurrentUser = async (req, res) => {
    const user = req.user;

    res.status(200).json(user);
};

// update user
const update = async (req, res) => {
    
    const {name, password, bio} = req.body

    let profileImage = null

    if(req.file) {
        profileImage = req.file.filename
    }

    const reqUser = req.user

    const user = await User.findById(reqUser._id).select("-password");

    if(name) {
        user.name = name;
    }

    if(password) {
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        user.password = hash;
    }

    if(profileImage) {
        user.profileImage = profileImage;
    }

    if(bio) {
        user.bio = bio;
    }

    await user.save();

    res.status(200).json(user);
};



module.exports = {
    register,
    login,
    getCurrentUser,
    update
};