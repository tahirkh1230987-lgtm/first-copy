
import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import connectDb from './dbConnect.js';
import User from './UserModel.js';
import { upload } from './multer.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

// ================= DASHBOARD USER MODEL =================

const dashboardUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    }
});

const DashboardUser = mongoose.model(
    'DashboardUser',
    dashboardUserSchema
);

// ================= SERVICE MODEL =================

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    }
});

const Service = mongoose.model('Service', serviceSchema);

// ================= SIGNUP API =================

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

// ================= LOGIN API =================

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

// ================= USERS API =================

// GET USERS
app.get('/users', async (req, res) => {
    try {
        const users = await DashboardUser.find();

        res.status(200).json(users);

    } catch (error) {
        console.log('Get Users Error:', error.message);

        res.status(500).json({
            message: 'Users fetch failed'
        });
    }
});

// ADD USER
app.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: 'Name and email are required'
            });
        }

        const newUser = await DashboardUser.create({
            name,
            email
        });

        res.status(201).json(newUser);

    } catch (error) {
        console.log('Add User Error:', error.message);

        res.status(500).json({
            message: 'User add failed'
        });
    }
});

// UPDATE USER
app.post('/updateUser', async (req, res) => {
    try {
        const { name, email, _id } = req.body;

        if (!_id || !name || !email) {
            return res.status(400).json({
                message: 'Name, email and ID are required'
            });
        }

        const updatedUser = await DashboardUser.findByIdAndUpdate(
            _id,
            { name, email },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json(updatedUser);

    } catch (error) {
        console.log('Update User Error:', error.message);

        res.status(500).json({
            message: 'User update failed'
        });
    }
});

// DELETE USER
app.post('/deleteUser', async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                message: 'User ID is required'
            });
        }

        const deletedUser = await DashboardUser.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({
            message: 'User deleted successfully'
        });

    } catch (error) {
        console.log('Delete User Error:', error.message);

        res.status(500).json({
            message: 'User delete failed'
        });
    }
});

// ================= SERVICES API =================

// GET SERVICES
app.get('/services', async (req, res) => {
    try {
        const services = await Service.find();

        res.status(200).json(services);

    } catch (error) {
        console.log('Get Services Error:', error.message);

        res.status(500).json({
            message: 'Services fetch failed'
        });
    }
});

// ADD SERVICE
app.post('/services', async (req, res) => {
    try {
        const { name, price } = req.body;

        if (!name || price === undefined || price === '') {
            return res.status(400).json({
                message: 'Name and price are required'
            });
        }

        const newService = await Service.create({
            name,
            price
        });

        res.status(201).json(newService);

    } catch (error) {
        console.log('Add Service Error:', error.message);

        res.status(500).json({
            message: 'Service add failed'
        });
    }
});

// UPDATE SERVICE
app.post('/updateService', async (req, res) => {
    try {
        const { name, price, _id } = req.body;

        if (!_id || !name || price === undefined || price === '') {
            return res.status(400).json({
                message: 'Name, price and ID are required'
            });
        }

        const updatedService = await Service.findByIdAndUpdate(
            _id,
            { name, price },
            { new: true, runValidators: true }
        );

        if (!updatedService) {
            return res.status(404).json({
                message: 'Service not found'
            });
        }

        res.status(200).json(updatedService);

    } catch (error) {
        console.log('Update Service Error:', error.message);

        res.status(500).json({
            message: 'Service update failed'
        });
    }
});

// DELETE SERVICE
app.post('/deleteService', async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                message: 'Service ID is required'
            });
        }

        const deletedService = await Service.findByIdAndDelete(id);

        if (!deletedService) {
            return res.status(404).json({
                message: 'Service not found'
            });
        }

        res.status(200).json({
            message: 'Service deleted successfully'
        });

    } catch (error) {
        console.log('Delete Service Error:', error.message);

        res.status(500).json({
            message: 'Service delete failed'
        });
    }
});

// ================= START SERVER =================

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
