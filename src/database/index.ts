/* eslint-disable no-console */
import mongoose, { ConnectionOptions } from 'mongoose';

const connectionOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(process.env.MONGODB_URI, connectionOptions)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(`Error connecting to MongoDB: ${err.message}`));
