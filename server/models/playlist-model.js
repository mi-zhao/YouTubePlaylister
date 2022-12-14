const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
    {
        published : {type: Boolean, default: false, required: false},
        name: { type: String, required: true },
        ownerUsername: {type: String, required: false},
        ownerEmail: { type: String, required: true },
        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String
        }], required: true },
        comments: { type: [{
            username: String,
            comment: String,
        }], required: false, default: [] },
        listens: { type: Number, default: 0, required: false },
        likes: { type: [{
            username: String
        }], default: [], required: false },
        dislikes: { type: [{
            username: String
        }], default: [], required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)
