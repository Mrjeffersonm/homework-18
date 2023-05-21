const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    reactionId: {
        type: mongoose.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => {
            if (date) return date.toISOString();
        },
    }
})

module.exports = dataSchema