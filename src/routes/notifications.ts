import express, {Request, Response} from 'express';
import notifications, { INotification } from '../models/notifications';

const router = express.Router();

// Get all notifications
router.get('/', async (req: Request, res: Response) => {
    try {
        const allNotifications: INotification[] = await notifications.find().populate('author');
        res.status(200).json(allNotifications);
    } catch (err:any) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});

// Get a specific notification
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const notification: INotification | null = await notifications.findById(req.params.id).populate('author');
        if(!notification) {
            return res.status(404).json({ message: 'Cannot find notification' });
        }
        res.status(200).json(notification);
    } catch (err:any) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});

// Create a new notification
router.post('/', async (req: Request, res: Response) => {
    try {
        const { title, content, author } = req.body;
        const newNotification: INotification = new notifications({
            title,
            content,
            author
        });
        await newNotification.save();
        res.status(201).json(newNotification);
    } catch (err:any) {
        console.log(err)
        res.status(400).json({ message: err.message });
    }
});

// Update an existing notification
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { title, content, author } = req.body;
        const updatedNotification: INotification | null = await notifications.findByIdAndUpdate(req.params.id, {
            title,
            content,
            author
        }, { new: true });
        if(!updatedNotification) {
            return res.status(404).json({ message: 'Cannot find notification' });
        }
        res.status(200).json(updatedNotification);
    } catch (err:any) {
        console.log(err)
        res.status(400).json({ message: err.message });
    }
}); 

// Delete an existing notification
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deletedNotification: INotification | null = await notifications.findByIdAndDelete(req.params.id);
        if(!deletedNotification) {
            return res.status(404).json({ message: 'Cannot find notification' });
        }
        res.status(200).json(deletedNotification);
    } catch (err:any) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
}); 

export default router;