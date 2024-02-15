const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Reaction Schema
const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => createdAtVal.toLocaleString(),
  },
}, {
  toJSON: {
    getters: true,
  },
  id: false,
});

// Thought Schema
const ThoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => createdAtVal.toLocaleString(),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [ReactionSchema],
}, {
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
});

// Virtual for reactionCount
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// Create Model
const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;
