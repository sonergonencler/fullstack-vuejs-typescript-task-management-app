import jwt from 'jsonwebtoken';

type UserPayload = {
  userId: string;
  username: string;
};

export const createToken = (payload: UserPayload) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '3d',
  });
};

export const verifyToken = (token: string) => {
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET!) as UserPayload;
    return {
      isValid: true,
      userId,
    };
  } catch (err) {
    return {
      isValid: !err.message.includes('jwt expired'),
      userId: '',
    };
  }
};
