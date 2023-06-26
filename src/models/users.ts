import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
    dateOfBirth: Date;
    friends: IUser['_id'][]; // Array of user ids
}

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

export default mongoose.model<IUser>('User', userSchema);