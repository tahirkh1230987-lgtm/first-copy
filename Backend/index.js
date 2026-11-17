
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import connectDb from './dbConnect.js';
import User from './UserModel.js';
import { upload } from './multer.js';

const app = express();

app.use(cors());
app.use(express.json());

// Uploaded images ko access karne ke liye
app.use('/uploads', express.static('uploads'));

// Signup API
app.post('/SignUp', upload.single('image'), async (request, response) => {
    try {
        const { name, email, password } = request.body;

        if (!name || !email || !password) {
            return response.status(400).json({
                message: 'All fields are required'
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return response.status(409).json({
                message: 'Email already registered'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            image: request.file ? request.file.filename : ''
        });

        response.status(201).json({
            message: 'Account created successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                image: newUser.image
            }
        });

    } catch (error) {
        console.log('Signup Error:', error.message);

        response.status(500).json({
            message: 'Signup failed'
        });
    }
});

// Login API
app.post('/Login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        const foundUser = await User.findOne({ email });

        if (!foundUser) {
            return res.status(401).json({
                message: 'Email or password is incorrect'
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            foundUser.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Email or password is incorrect'
            });
        }

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: foundUser._id,
                name: foundUser.name,
                email: foundUser.email
            }
        });

    } catch (error) {
        console.log('Login Error:', error.message);

        res.status(500).json({
            message: 'Login failed'
        });
    }
});

// Start Server
const startServer = async () => {
    try {
        await connectDb();

        app.listen(5000, () => {
            console.log('Server running on port 5000');
        });

    } catch (error) {
        console.log('Database connection failed:', error.message);
    }
};

startServer();
