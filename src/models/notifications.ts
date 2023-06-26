import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './users';
import { IComment } from './comments';
import { IPost } from './posts';

export interface INotification extends Document {
    user: IUser['_id'];
    type: string;
    content: IPost['_id'] | IComment['_id'];
    createdAt: Date;
    read: boolean;
}

const notificationSchema = new mongoose.Schema<INotification>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    content: { type: mongoose.Schema.Types.ObjectId, required: true },
    createdAt: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }
});

export default mongoose.model<INotification>('Notification', notificationSchema);