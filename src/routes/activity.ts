import express, {Request, Response} from 'express';
import activity, { IActivity } from '../models/activity';

const router = express.Router();

// Get all activity
router.get('/', async (req: Request, res: Response) => {
    try {
        const allActivity: IActivity[] = await activity.find().populate('author');
        res.status(200).json(allActivity);
    } catch (err:any) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});

// Get a specific activity
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const userActivity: IActivity | null = await activity.findById(req.params.id).populate('author');
        if(!activity) {
            return res.status(404).json({ message: 'Cannot find activity' });
        }
        res.status(200).json(userActivity);
    } catch (err:any) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});

// Get all activity for a user
router.get('/user/:userId', async (req: Request, res: Response) => {
    try {
        const allActivity: IActivity[] = await activity.find({ author: req.params.userId }).populate('author');
        res.status(200).json(allActivity);
    } catch (err:any) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});

// Create a new activity
router.post('/', async (req: Request, res: Response) => {
    try {
        const { title, content, author } = req.body;
        const newActivity: IActivity = new activity({
            title,
            content,
            author
        });
        await newActivity.save();
        res.status(201).json(newActivity);
    } catch (err:any) {
        console.log(err)
        res.status(400).json({ message: err.message });
    }
});

// Update an existing activity
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { title, content, author } = req.body;
        const updatedActivity: IActivity | null = await activity.findByIdAndUpdate(req.params.id, {
            title,
            content,
            author
        }, { new: true });
        if(!updatedActivity) {
            return res.status(404).json({ message: 'Cannot find activity' });
        }
        res.status(200).json(updatedActivity);
    } catch (err:any) {
        console.log(err)
        res.status(400).json({ message: err.message });
    }
});

// Delete an existing activity
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deletedActivity: IActivity | null = await activity.findByIdAndDelete(req.params.id);
        if(!deletedActivity) {
            return res.status(404).json({ message: 'Cannot find activity' });
        }
        res.status(200).json(deletedActivity);
    } catch (err:any) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});

export default router;
