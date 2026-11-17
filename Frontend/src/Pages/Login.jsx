
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const setBackendData = async () => {
        try {
            const { data } = await axios.post(
                'http://localhost:5000/Login',
                { email, password }
            );

            toast.success(data.message);

            setUser(data.user);

            setEmail('');
            setPassword('');

        } catch (error) {
            toast.error(
                error.response?.data?.message || 'Login Failed!'
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow w-80">

                <h1 className="text-2xl font-bold mb-6">Login</h1>

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

                <button
                    onClick={setBackendData}
                    className="w-full bg-blue-600 text-white p-2 rounded"
                >
                    Login
                </button>

                {user && (
                    <div className="mt-5 text-center">
                        <h2 className="font-bold">{user.name}</h2>
                        <p>{user.email}</p>

                        {user.image && (
                            <img
                                src={`http://localhost:5000/uploads/${encodeURIComponent(user.image)}`}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover mx-auto mt-3"
                            />
                        )}
                    </div>
                )}

            </div>
        </div>
    );
};

export default Login;
