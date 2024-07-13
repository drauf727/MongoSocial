const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,    
        ref: 'thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
      }],
});

userSchema.virtual('friendCount').get( function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
