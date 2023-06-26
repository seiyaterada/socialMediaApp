import mongoose from "mongoose";
import connectToDatabase from "../db/connectToDatabase";
import User from "../models/users";
import Posts from "../models/posts";
import Comments from "../models/comments";
import Activities from "../models/activity";
import Notifications from "../models/notifications";

const sampleData = [
    {
        name: 'John Smith',
        username: 'johnsmith',
        email: 'johnsmith@example.com',
        password: 'password123',
        dateOfBirth: new Date('1990-01-01'),
        friends: []
    },
    {
        name: 'Jane Doe',
        username: 'janedoe',
        email: 'janedoe@example.com',
        password: 'password456',
        dateOfBirth: new Date('1995-05-10'),
        friends: []
    },
    {
        name: 'Bob Johnson',
        username: 'bobjohnson',
        email: 'bobjohnson@example.com',
        password: 'password789',
        dateOfBirth: new Date('1985-08-20'),
        friends: []
    },
    {
        name: 'Sarah Lee',
        username: 'sarahlee',
        email: 'sarahlee@example.com',
        password: 'password111',
        dateOfBirth: new Date('1993-11-15'),
        friends: []
    },
    {
        name: 'David Kim',
        username: 'davidkim',
        email: 'davidkim@example.com',
        password: 'password222',
        dateOfBirth: new Date('1998-06-25'),
        friends: []
    } 
];
  

const seed = async () => {
    await connectToDatabase();
    await User.deleteMany({});
    await Posts.deleteMany({});
    await Comments.deleteMany({});
    await Activities.deleteMany({});
    await Notifications.deleteMany({});
    await User.insertMany(sampleData);
    console.log('Database seeded');
}

export default seed;