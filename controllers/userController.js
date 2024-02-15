const User = require('../models/User');

const userController = {
  // Get all users
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts friends',
        select: '-__v'
      })
      .select('-__v')
      .then(users => res.json(users))
      .catch(err => res.status(500).json(err));
  },

  // Get a single user by id
  getUserById({ params }, res) {
    User.findById(params.id)
      .populate({
        path: 'thoughts friends',
        select: '-__v'
      })
      .select('-__v')
      .then(user => res.json(user))
      .catch(err => res.status(404).json(err));
  },

  // Create a new user
  createUser({ body }, res) {
    User.create(body)
      .then(user => res.json(user))
      .catch(err => res.status(400).json(err));
  },

  // Update a user by id
  updateUser({ params, body }, res) {
    User.findByIdAndUpdate(params.id, body, { new: true, runValidators: true })
      .then(user => res.json(user))
      .catch(err => res.status(400).json(err));
  },

  // Delete a user by id
  deleteUser({ params }, res) {
    User.findByIdAndDelete(params.id)
      .then(user => res.json({ message: 'User deleted' }))
      .catch(err => res.status(404).json(err));
  },

  // Add a friend
  addFriend({ params }, res) {
    User.findByIdAndUpdate(
      params.userId,
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
    .then(user => res.json(user))
    .catch(err => res.status(404).json(err));
  },

  // Remove a friend
  removeFriend({ params }, res) {
    User.findByIdAndUpdate(
      params.userId,
      { $pull: { friends: params.friendId } },
      { new: true }
    )
    .then(user => res.json(user))
    .catch(err => res.status(404).json(err));
  }
};

module.exports = userController;
