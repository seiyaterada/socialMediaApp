import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './users';

export interface IComment extends Document {
    content: string;
    author: IUser['_id'];
    createdAt: Date;
    likes: IUser['_id'][];
}

const commentSchema = new mongoose.Schema<IComment>({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    likes: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] }
});

export default mongoose.model<IComment>('Comment', commentSchema);