import mongoose from 'mongoose';
import User from '../models/users';
import Post from '../models/posts';
import Comment from '../models/comments';

const connectionString = 'mongodb://localhost:27017/mydatabase';

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    // Clear all existing data from the database
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});

    // Create some users
    const alice = await User.create({
      name: 'Alice',
      username: 'alice',
      email: 'alice@example.com',
      password: 'password123',
      dateOfBirth: new Date('1990-01-01'),
      friends: [],
    });

    const bob = await User.create({
      name: 'Bob',
      username: 'bob',
      email: 'bob@example.com',
      password: 'password456',
      dateOfBirth: new Date('1995-06-01'),
      friends: [alice._id],
    });

    // Create some posts
    const post1 = await Post.create({
      title: 'My first post',
      content: 'Hello world!',
      author: alice._id,
      createdAt: new Date(),
      likes: [],
      comments: [],
    });

    const post2 = await Post.create({
      title: 'My second post',
      content: 'This is my second post.',
      author: bob._id,
      createdAt: new Date(),
      likes: [],
      comments: [],
    });

    // Create some comments
    const comment1 = await Comment.create({
      content: 'Great post!',
      author: bob._id,
      createdAt: new Date(),
      likes: [],
    });

    const comment2 = await Comment.create({
      content: 'Nice work!',
      author: alice._id,
      createdAt: new Date(),
      likes: [],
    });

    // Add comments to posts
    await Post.findByIdAndUpdate(
      post1._id,
      { $push: { comments: comment1._id } },
      { new: true }
    );

    await Post.findByIdAndUpdate(
      post2._id,
      { $push: { comments: comment2._id } },
      { new: true }
    );

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error.message);
  } finally {
    // Disconnect from the database
    await mongoose.disconnect();
  }
}

seedDatabase();
