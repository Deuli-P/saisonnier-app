const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    description: String,
    imageUrl:{
        type: String,
        default: null,
    },
    createAt:{
        type: Date,
        default: Date.now,
    },
    likes:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'User'
            }
        }
    ],
    comments:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
            text: String,
            createAt:{
                type: Date,
                default: Date.now,
            },
        }
    ],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;