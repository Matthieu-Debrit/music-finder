'use strict';
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const authController = require('../config/passport');

const express = require('express');
const router = express.Router();

const User = require('../models/user');


router.post('/signup', function (req, res) {
    console.log(JSON.stringify(req.body, null, 4));
    if (!req.body.email || !req.body.password) {
        res.status(400).json({success: false, msg: 'Please pass email and password.'});
    } else {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        // save the user
        newUser.save(function (err) {
            if (err) {
                return res.status(400).json({success: false, msg: 'Email already registered.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
});

router.post('/connect', function (req, res) {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        console.log('test');
        if (err) throw err;

        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. Email not found.'});
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    const token = jwt.sign({email: user.email, password: user.password}, config.secret);
                    // return the information including token as JSON
                    res.json({success: true, username: user.username, email: user.email, token: 'JWT ' + token});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
});

router.get('/checkAuth', authController.isAuthenticated, function (req, res) {
    const token = getToken(req.headers);
    if (token && req.user) {
        res.json('Authentified.');
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

function getToken(headers) {
    if (headers && headers.authorization) {
        const parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
}

module.exports = router;
