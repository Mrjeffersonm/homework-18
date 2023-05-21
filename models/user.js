const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String,
        trim: true,
        unique: true,
    },
    email: {
        required: true,
        type: String,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
              return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
          },
    },
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
});

dataSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

module.exports = mongoose.model('User', dataSchema)