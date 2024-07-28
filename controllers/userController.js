const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require('bcrypt');


const getUsersController = async (req, res, next) => {
    const allUsers = await User.find()

    res.status(200).json({
        users: allUsers,
    });
};


const createUserController = async (req, res, next) => {
    const {name, email, password} = req.body;

    const newUser = new User({
        name,
        email,
        password: await bcrypt.hash(password, 10),
    });

    try {
        const createdUser = await newUser.save();
        res.status(201).json({
            message: 'user created successfully',
            user: createdUser,
        });
    } catch (error) {
        const errors = {};
        if (error.name === 'ValidationError') {
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message;
            });
        } else if (error.code && error.code === 11000) {
            errors.email = 'Email already exists.';
        } else {
            errors.general = 'Something went wrong. Please try again later.';
        }
        res.status(400).send({ errors });
    }
};

module.exports = {
    getUsersController,
    createUserController,
};
