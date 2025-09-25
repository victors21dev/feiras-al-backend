import mongoose, { Schema, model, models } from 'mongoose';
export interface IUser extends mongoose.Document {
  clerkId: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true });

const User = models.User || model<IUser>('User', UserSchema);

export default User;