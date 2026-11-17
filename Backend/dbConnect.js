
import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/signup');
        console.log('MongoDB is connected');
    } catch (error) {
        console.log('Database connection error:', error.message);
        throw error;
    }
};

export default connectDb;
