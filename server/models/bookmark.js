'use strict';
const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
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

BookmarkSchema.pre('save', function (next) {
    const album = this;
    // console.log(album);
    next();
});

module.exports = mongoose.model('Bookmark', BookmarkSchema);