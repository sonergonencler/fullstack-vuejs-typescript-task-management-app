import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '../utils/response-error'
import { verifyToken } from '../utils/token-helper'

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');

  if (!authHeader) {
    const error = new ResponseError(401, 'Access denied: Auth header not found!');
    throw error;
  }

  const token = authHeader.split(' ')[1];
  const { userId, isValid } = verifyToken(token);

  if (!isValid) {
    const error = new ResponseError(401, 'Your session has probably timed out. Please login again.');
    throw error;
  }

  res.locals.userId = userId;

  next();
};
