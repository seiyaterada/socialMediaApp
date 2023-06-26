import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './users';
import { IComment } from './comments';
import { IPost } from './posts';

export interface IActivity extends Document {
    user: IUser['_id'];
    type: string;
    contentId: IPost['_id'] | IComment['_id'];
    createdAt: Date;
}

const activitySchema = new mongoose.Schema<IActivity>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    contentId: { type: mongoose.Schema.Types.ObjectId},
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IActivity>('Activity', activitySchema);

