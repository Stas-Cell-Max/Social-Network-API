const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'Thought',
  }],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  toJSON: {
    virtuals: true,
  },
  id: false,
});

// Virtual for friendCount
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// Create Model
const User = mongoose.model('User', UserSchema);

module.exports = User;
