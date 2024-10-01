import { Env } from '@config/env';
import mongoose from 'mongoose';

const connect = async (): Promise<void> => {
  try {
    await mongoose.connect(Env.DATABASE_URL, {
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1); // Termina o processo em caso de falha
  }
};

export default connect;