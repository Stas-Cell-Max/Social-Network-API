const mongoose = require('mongoose');
const User = require('../models/User');
const Thought = require('../models/Thought');

const userSeeds = require('./userSeeds');
const thoughtSeeds = require('./thoughtSeeds');

mongoose.connect('mongodb://localhost/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected...'))
.catch((err) => console.error('MongoDB connection error:', err));

const seedDB = async () => {
  // Empty the collections
  await User.deleteMany({});
  await Thought.deleteMany({});

  // Insert users and thoughts
  const users = await User.insertMany(userSeeds);
  const thoughts = await Thought.insertMany(thoughtSeeds.map(thought => ({
    ...thought,
    username: users.find(user => user.username === thought.username)._id
  })));

  // Add friends (for simplicity, we'll just make each user friends with all others)
  for (const user of users) {
    user.friends = users.filter(u => u.username !== user.username).map(u => u._id);
    await user.save();
  }

  // Add reactions to thoughts
  for (const thought of thoughts) {
    const user = users.find(u => u._id.equals(thought.username));
    thought.reactions.push({
      reactionBody: 'Great thought!',
      username: user.username,
    });
    await thought.save();
  }

  console.log('Database seeded!');
};

seedDB().then(() => {
  mongoose.connection.close();
});
