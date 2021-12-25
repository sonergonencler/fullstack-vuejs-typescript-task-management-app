import jwtDecode, { JwtPayload } from 'jwt-decode';
import { getToken } from './storage';

export const getAuthInfo = () => {
  const token = getToken();

  let isValid = true;
  let payload = {};

  try {
    if (!token) {
      throw new Error('Token not found');
    }

    const decoded = jwtDecode<JwtPayload>(token);

    if (Date.now() >= decoded.exp! * 1000) {
      isValid = false;
    } else {
      isValid = true;
      payload = decoded;
    }
  } catch ({ message }) {
    isValid = false;
  }

  return { isValid, payload };
};
