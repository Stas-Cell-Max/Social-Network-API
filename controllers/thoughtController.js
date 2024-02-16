const Thought = require('../models/Thought');
const User = require('../models/User');


const thoughtController = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ createdAt: -1 }) // Sort by newest first
      .then(thoughts => res.json(thoughts))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Get a single thought by id
  getThoughtById({ params }, res) {
    Thought.findById(params.id)
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .then(thought => {
        if (!thought) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(thought);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Create a new thought and push it to the associated user's thoughts array
  createThought({ body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findByIdAndUpdate(
          body.userId,
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(user => {
        if (!user) {
          res.status(404).json({ message: 'Thought created, but found no user with this id' });
          return;
        }
        res.json({ message: 'Thought successfully created!' });
      })
      .catch(err => res.json(err));
  },

  // Update a thought by id
  updateThought({ params, body }, res) {
    Thought.findByIdAndUpdate(params.id, body, { new: true, runValidators: true })
      .then(thought => {
        if (!thought) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(thought);
      })
      .catch(err => res.status(400).json(err));
  },

  // Delete a thought by id
  deleteThought({ params }, res) {
    Thought.findByIdAndDelete(params.id)
      .then(thought => {
        if (!thought) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        return User.findByIdAndUpdate(
          thought.userId,
          { $pull: { thoughts: params.id } },
          { new: true }
        );
      })
      .then(() => {
        res.json({ message: 'Thought successfully deleted!' });
      })
      .catch(err => res.status(404).json(err));
  },

  // Add a reaction to a thought
  addReaction({ params, body }, res) {
    Thought.findByIdAndUpdate(
      params.thoughtId,
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
    .then(thought => {
      if (!thought) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(thought);
    })
    .catch(err => res.status(400).json(err));
  },

  // Remove a reaction from a thought
  removeReaction({ params }, res) {
    Thought.findByIdAndUpdate(
      params.thoughtId,
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
    .then(thought => res.json(thought))
    .catch(err => res.status(400).json(err));
  }
};

module.exports = thoughtController;
