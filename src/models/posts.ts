import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './users';
import { IComment } from './comments';

export interface IPost extends Document { 
    title: string;
    content: string;
    author: IUser['_id'];
    createdAt: Date;
    numLikes: number;
    likes: IUser['_id'][];
    comments: IComment['_id'][];
}

const postSchema = new mongoose.Schema<IPost>({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    numLikes: { type: Number, default: 0 },
    likes: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] },
    comments: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] }
});

export default mongoose.model<IPost>('Post', postSchema);