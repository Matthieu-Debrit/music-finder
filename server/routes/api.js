'use strict';
const express = require('express');
const router = express.Router();
const authController = require('../config/passport');

const Bookmark = require('../models/bookmark');
const Like = require('../models/like');


router.post('/bookmark', authController.isAuthenticated, checkAlbumData, function (req, res) {
    if (req.user) {
        const bookmark = new Bookmark({
            user_id: req.user.email,
            album_id: req.body.album_id,
            album: req.body.album,
            artist: req.body.artist,
            image: req.body.image
        });
        Bookmark.findOne({
            user_id: req.user.email,
            album_id: req.body.album_id,
        })
            .then((doc) => {
                if (!doc) {
                    return bookmark.save()
                        .then(() => {
                            res.status(200).json({success: true, msg: 'Successful created new bookmark.'});
                        });
                } else {
                    res.status(200).json({success: true, msg: 'Bookmark already exists.'});
                }
            })
            .catch((err) => {
                res.status(500).send({success: false, msg: 'MongoDB server error.'});
            });
    } else {
        res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.delete('/bookmark', authController.isAuthenticated, function (req, res) {
    if (req.user) {
        console.log(req.body.album_id);
        Bookmark.deleteMany({
            user_id: req.user.email,
            album_id: req.body.album_id,
        })
            .then(() => {
                res.json({success: true, msg: 'Successful deleted bookmark.'});
            })
            .catch(() => {
                res.status(500).send({success: false, msg: 'MongoDB server error.'});
            });
    } else {
        res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.get('/bookmarks', authController.isAuthenticated, function (req, res) {
    if (req.user) {
        Bookmark.find({user_id: req.user.email})
            .then((docs) => {
                res.status(200).send({success: true, data: docs});
            })
            .catch(() => {
                res.status(500).send({success: false, msg: 'MongoDB server error.'});
            });
    } else {
        res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.post('/like', authController.isAuthenticated, checkAlbumData, function (req, res) {
    if (req.user) {
        const like = new Like({
            user_id: req.user.email,
            album_id: req.body.album_id,
            album: req.body.album,
            artist: req.body.artist,
            image: req.body.image
        });
        Like.findOne({
            user_id: req.user.email,
            album_id: req.body.album_id,
        })
            .then((doc) => {
                if (!doc) {
                    return like.save()
                        .then(() => {
                            res.status(200).json({success: true, msg: 'Successful created new like.'});
                        });
                } else {
                    res.status(200).json({success: true, msg: 'Like already exists.'});
                }
            })
            .catch((err) => {
                res.status(500).send({success: false, msg: 'MongoDB server error.'});
            });
    } else {
        res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.delete('/like', authController.isAuthenticated, function (req, res) {
    if (req.user) {
        Like.deleteMany({
            user_id: req.user.email,
            album_id: req.body.album_id,
        })
            .then(() => {
                res.json({success: true, msg: 'Successful deleted like.'});
            })
            .catch(() => {
                res.status(500).send({success: false, msg: 'MongoDB server error.'});
            });
    } else {
        res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

router.get('/likes', authController.isAuthenticated, function (req, res) {
    if (req.user) {
        Like.find({user_id: req.user.email})
            .then((docs) => {
                res.status(200).send({success: true, data: docs});
            })
            .catch(() => {
                res.status(500).send({success: false, msg: 'MongoDB server error.'});
            });
    } else {
        res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
});

function checkAlbumData(req, res, next) {
    if (req.body.album_id && req.body.album && req.body.artist) {
        next();
    } else {
        res.status(400).send({success: false, msg: 'Missing info.'});
    }
}

module.exports = router;