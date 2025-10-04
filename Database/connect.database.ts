import mongoose from 'mongoose';

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = {
    connection: null,
    promise: null,
  };
}

const ConnectToDatabase = async () => {
  const MONGO_URI = process.env.MONGODB_URI as string;
  if (!MONGO_URI) {
    throw new Error('MongoDB URI must be defined');
  }

  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    const option = {
      maxPoolSize: 5,
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGO_URI!, option)
      .then((mongoose): mongoose.Connection => {
        return mongoose.connection;
      });

    try {
      cached.connection = await cached.promise;
      return cached.connection;
    } catch (error) {
      cached.promise = null;
    }
  }
};

export { ConnectToDatabase };

// Alternate Easier But Less Optimsied Approach //

// type ConnectionObject = {
//   isConnected?: number;
// };

// const connection: ConnectionObject = {};

// const dbConnect = async (): Promise<void> =>  {
//   if (connection.isConnected) {
//     return;
//   }
//   try {
//     const db = await mongoose.connect(process.env.MONGODB_URI as string);
//     connection.isConnected = db.connections[0].readyState;
//   }catch (error) {
//     console.error('Database connection failed:', error);
//     process.exit(1);
//   }
// }

// export default dbConnect;
