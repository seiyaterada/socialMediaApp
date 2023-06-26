import express, { Request, Response } from 'express';
import posts, { IPost } from '../models/posts';
import activities, { IActivity } from '../models/activity';
import { getCache, setCache } from '../db/cacheUtil';

const router = express.Router();

// Get all posts
router.get('/', async (req: Request, res: Response) => {
    try {
        const allPosts: IPost[] = await posts.find().populate('author');
        res.status(200).json(allPosts);
    } catch (err:any) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});

// Get a specific post
router.get('/:id', async (req: Request, res: Response) => {
    try {
        let post: IPost | string | null | undefined;
        post = await getCache(req.params.id);
        if(!post) {
            post = await posts.findById(req.params.id).populate('author');
            await setCache(req.params.id, post);
        }
        if(!post) {
            return res.status(404).json({ message: 'Cannot find post' });
        }
        res.status(200).json(post);
    } catch (err:any) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});

// Create a new post
router.post('/', async (req: Request, res: Response) => {
    try {
        const { title, content, author } = req.body;
        const newPost: IPost = new posts({
            title,
            content,
            author
        });
        await newPost.save();

        const activity: IActivity = new activities({
            user: author,
            contentId: newPost._id,
            activity: 'created a new post',
        });

        await activity.save();
        res.status(201).json(newPost);
    } catch (err:any) {
        console.log(err)
        res.status(400).json({ message: err.message });
    }
});

// Update an existing post
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const { title, content, author } = req.body;
        const updatedPost: IPost | null = await posts.findByIdAndUpdate(req.params.id, {
            title,
            content,
            author
        }, { new: true });
        if(!updatedPost) {
            return res.status(404).json({ message: 'Cannot find post' });
        }
        res.status(200).json(updatedPost);
    } catch (err:any) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});

// Delete a post
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deletedPost: IPost | null = await posts.findByIdAndDelete(req.params.id);
        if(!deletedPost) {
            return res.status(404).json({ message: 'Cannot find post' });
        }
        res.status(200).json(deletedPost);
    } catch (err:any) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});

// Like a post
router.post('/:id/like', async (req: Request, res: Response) => {
    try {
        const post: IPost | null = await posts.findById(req.params.id);
        if(!post) {
            return res.status(404).json({ message: 'Cannot find post' });
        }
        const activity: IActivity = new activities({
            user: req.body.userId,
            contentId: req.params.id,
            activity: 'liked a post',
        });
        await activity.save();
        post.likes.push(req.body.userId);
        post.numLikes = post.numLikes + 1;
        await post.save();
        res.status(200).json(post);
    } catch (err:any) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});

export default router;