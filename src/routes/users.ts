import express, { Request, Response } from 'express';
import users, {IUser} from '../models/users';

const router = express.Router();

// Get all users
router.get('/', async (req: Request, res: Response) => {
    try {
        const allUsers: IUser[] = await users.find().populate('friends');
        res.status(200).json(allUsers);
    } catch (err:any) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});

// Get a specific user
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const user: IUser | null = await users.findById(req.params.id).populate('friends');
        if(!user) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
        res.status(200).json(user);
    } catch (err:any) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});

// Create a new user
router.post('/', async (req: Request, res: Response) => {
    try {
        const { name, username, email, password, dateOfBirth } = req.body;
        const newUser: IUser = new users({
            name,
            username,
            email,
            password,
            dateOfBirth
        });
        await newUser.save();
        res.status(201).json("Created a new user");
    } catch (err:any) {
        console.log(err)
        res.status(400).json({ message: err.message });
    }
});

// Update an existing user
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { name, username, email, password, dateOfBirth } = req.body;
        const updatedUser: IUser | null = await users.findByIdAndUpdate(req.params.id, {
            name,
            username,
            email,
            password,
            dateOfBirth
        }, { new: true });
        if(!updatedUser) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
        res.status(200).json(updatedUser);
    } catch (err:any) {
        console.log(err)
        res.status(400).json({ message: err.message });
    }
});

// Delete an existing user
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deletedUser: IUser | null = await users.findByIdAndDelete(req.params.id);
        if(!deletedUser) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
        res.status(200).json(deletedUser);
    } catch (err:any) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});

// Add a friend
router.post('/:id/friends', async (req: Request, res: Response) => {
    try {
        const { friendId } = req.body;
        const user: IUser | null = await users.findById(req.params.id);
        if(!user) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
        const friend: IUser | null = await users.findById(friendId);
        if(!friend) {
            return res.status(404).json({ message: 'Cannot find friend' });
        }

        if(user.friends.includes(friendId)) {
            return res.status(400).json({ message: 'User already has this friend' });
        }
        user.friends.push(friendId);
        await user.save();
        res.json(user);
    } catch (err:any) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});

export default router

