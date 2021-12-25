import { connect, ConnectOptions } from 'mongoose';

export const connection = async () => {
  try {
    const MONGO_URL = process.env.MONGO_URL;

    if (!MONGO_URL) {
      throw new Error('MONGO URL is required');
    }

    const options = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    } as ConnectOptions;

    await connect(MONGO_URL, options);
  } catch (err) {
    throw err;
  }
};
