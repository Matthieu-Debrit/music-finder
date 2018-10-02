'use strict';
const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    album_id: {
      type: String,
      required: true
    },
    album: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});

LikeSchema.pre('save', function (next) {
    const album = this;
    // console.log(album);
    next();
});

module.exports = mongoose.model('Like', LikeSchema);