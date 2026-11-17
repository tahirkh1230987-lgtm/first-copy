
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(null);

    const setBackendData = async () => {
        try {
            const formData = new FormData();

            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('image', image);

            await axios.post(
                'http://localhost:5000/SignUp',
                formData
            );

            toast.success('Signup Successful!');

            setName('');
            setEmail('');
            setPassword('');
            setImage(null);

        } catch (error) {
            toast.error('Signup Failed!');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow w-80">

                <h1 className="text-2xl font-bold mb-6">Sign Up</h1>

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-2 rounded mb-4"
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="w-full border p-2 rounded mb-4"
                />

                <button
                    onClick={setBackendData}
                    className="w-full bg-blue-600 text-white p-2 rounded"
                >
                    Sign Up
                </button>

            </div>
        </div>
    );
};

export default SignUp;
