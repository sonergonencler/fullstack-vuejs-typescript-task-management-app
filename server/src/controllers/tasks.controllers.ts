import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '../utils/response-error';
import { validateTask } from '../validations/task.validations';
import TaskModel from '../models/task.model';

export const getTasks = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const tasks = await TaskModel.find({ creator: res.locals.userId }).sort({ createdAt: 1 });
    res.status(200).json({ ok: true, result: tasks });
  } catch (err) {
    next(err);
  }
};

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  const { validationErrors } = validateTask(req.body);

  if (validationErrors) {
    const error = new ResponseError(422, validationErrors.message);
    return next(error);
  }

  try {
    const createdTask = await TaskModel.create({
      ...req.body,
      creator: res.locals.userId,
    });
    res.status(201).json({ ok: true, result: createdTask });
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
  const taskId = req.params.id;

  try {
    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: taskId, creator: res.locals.userId },
      {
        ...req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    );

    if (!updatedTask) {
      const error = new ResponseError(400, 'Task not found.');
      throw error;
    }

    res.status(200).json({ ok: true, result: updatedTask });
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  const taskId = req.params.id;

  try {
    const deletedTask = await TaskModel.findByIdAndDelete({ _id: taskId, creator: res.locals.userId });

    if (!deletedTask) {
      const error = new ResponseError(400, 'Task not found.');
      throw error;
    }

    res.status(200).json({ ok: true, result: deletedTask });
  } catch (err) {
    next(err);
  }
};
