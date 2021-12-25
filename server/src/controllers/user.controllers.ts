import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '../utils/response-error';
import { validateLogin, validateRegister } from '../validations/user.validations';
import UserModel from '../models/user.model';
import { createToken } from '../utils/token-helper';

export const signupHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const { validationErrors } = validateRegister(req.body);

  if (validationErrors) {
    const error = new ResponseError(422, validationErrors.message);
    return next(error);
  }

  try {
    const user = await UserModel.create({
      username,
      password,
    });

    const token = createToken({ userId: user._id, username: user.username });

    res.status(201).json({ ok: true, result: { userId: user._id, token } });
  } catch (err) {
    if (err.code === 11000) {
      err.code = 409;
      err.message = 'User already exist';
    }
    next(err);
  }
};

export const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  const { validationErrors } = validateLogin(req.body);

  if (validationErrors) {
    const error = new ResponseError(422, validationErrors.message);
    return next(error);
  }

  try {
    const user = await UserModel.findOne({ username });

    if (!user) {
      const error = new ResponseError(401, 'A user with this username could not find');
      throw error;
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      const error = new ResponseError(401, 'This password is wrong');
      throw error;
    }

    const token = createToken({ userId: user._id, username: user.username });

    res.status(200).json({ ok: true, result: { userId: user._id, token } });
  } catch (err) {
    next(err);
  }
};

export const getCurrentUser = async (_req: Request, res: Response, next: NextFunction) => {
  const userId = res.locals.userId;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      const error = new ResponseError(400, 'Could not find the user ');
      throw error;
    }

    res.status(200).json({ ok: true, result: { userId: user._id, username: user.username } });
  } catch (err) {
    next(err);
  }
};
