import mongoose from 'mongoose';

let isConnected = false;

export async function connect() {
    if (isConnected) {
        console.log('Already connected to MongoDB');
        return;
    }

    try {
        // URL-encode the username and password
        const username = encodeURIComponent('root');
        const password = encodeURIComponent('Admin@123');

        // Construct the connection string
        const connectionString = `mongodb://${username}:${password}@91.219.60.69:27017`;

        const db = await mongoose.connect(connectionString, {
            useNewUrlParser: true, // Deprecated in Mongoose 6+
            useUnifiedTopology: true, // Deprecated in Mongoose 6+
        });

        isConnected = true;
        console.log('MongoDB connected successfully');
        return db;
    } catch (error) {
        console.log('MongoDB connection error:', error);
        throw error;
    }
}