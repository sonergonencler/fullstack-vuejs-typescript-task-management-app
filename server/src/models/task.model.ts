import mongoose from 'mongoose';
import { UserDocument } from './user.model';

export type TaskDocument = mongoose.Document & {
  text: string;
  isCompleted: boolean;
  isPinned: boolean;
  list: string;
  creator: UserDocument['_id'];
};

const taskSchema = new mongoose.Schema<TaskDocument>(
  {
    text: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    list: {
      type: String,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const TaskModel = mongoose.model<TaskDocument>('Task', taskSchema);

export default TaskModel;
