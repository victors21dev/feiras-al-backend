import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI não foi definida no arquivo .env');
    }

    await mongoose.connect(mongoUri);

    console.log('MongoDB Conectado com Sucesso!');

  } catch (error) {
    console.error('Erro ao conectar com o MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;