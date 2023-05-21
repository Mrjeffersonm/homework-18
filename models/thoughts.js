const mongoose = require('mongoose');
const reactionSchema = require('./reactions');

const dataSchema = new mongoose.Schema({
    thoughtText: {
        required: true,
        type: String,
        minLength: 1,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => {
            if (date) return date.toISOString();
        },   
    },
    username: {
        required: true,
        type: String,
    },
    reactions: [reactionSchema],
});

dataSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });

module.exports = mongoose.model('Thoughts', dataSchema)