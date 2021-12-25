import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export type UserDocument = mongoose.Document & {
  username: string;
  password: string;
};

const userSchema = new mongoose.Schema<UserDocument>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const UserModel = mongoose.model<UserDocument>('User', userSchema);

export default UserModel;
