import express, { Request, Response } from 'express';
import comments, { IComment } from '../models/comments';
import activities, { IActivity } from '../models/activity';

const router = express.Router();

// Get all comments for a post
router.get('/:postId', async (req: Request, res: Response) => {
    try {
        // get all comments for a post
        const allComments: IComment[] = await comments.find({ post: req.params.postId }).populate('author');
        res.status(200).json(allComments);
    } catch (err:any) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});

// Get a specific comment
router.get('/:postId/:id', async (req: Request, res: Response) => {
    try {
        const comment: IComment | null = await comments.findById(req.params.id).populate('author');
        if(!comment) {
            return res.status(404).json({ message: 'Cannot find comment' });
        }
        res.status(200).json(comment);
    } catch (err:any) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});

// Create a new comment
router.post('/:postId', async (req: Request, res: Response) => {
    try {
        const { content, author } = req.body;
        const newComment: IComment = new comments({
            content,
            author,
            post: req.params.postId
        });
        await newComment.save();
        const activity: IActivity = new activities({
            user: author,
            contentId: newComment._id,
            action: 'commented'
        });
        await activity.save();

        res.status(201).json(newComment);
    } catch (err:any) {
        console.log(err)
        res.status(400).json({ message: err.message });
    }
});

// Update an existing comment
router.put('/:postId/:id', async (req: Request, res: Response) => {
    try {
        const { content, author } = req.body;
        const updatedComment: IComment | null = await comments.findByIdAndUpdate(req.params.id, {
            content,
            author,
            post: req.params.postId
        }, { new: true });
        if(!updatedComment) {
            return res.status(404).json({ message: 'Cannot find comment' });
        }
        res.status(200).json(updatedComment);
    } catch (err:any) {
        console.log(err)
        res.status(400).json({ message: err.message });
    }
});

// Delete a comment
router.delete('/:postId/:id', async (req: Request, res: Response) => {
    try {
        const deletedComment: IComment | null = await comments.findByIdAndDelete(req.params.id);
        if(!deletedComment) {
            return res.status(404).json({ message: 'Cannot find comment' });
        }
        res.status(200).json(deletedComment);
    } catch (err:any) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});

export default router;