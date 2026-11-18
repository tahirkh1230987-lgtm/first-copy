import React, { useState } from 'react';

const Dashboard = () => {

    const [users, setUsers] = useState([
        { id: 1, name: "Ali", email: "ali@gmail.com" },
        { id: 2, name: "Ragnar", email: "ragnar@gmail.com" },
    ]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [editId, setEditId] = useState(null);

    function handleSubmit() {
        if (name === '' || email === '') {
            alert('Name aur email dono likhein');
            return;
        }

        if (editId) {
            setUsers(
                users.map((u) =>
                    u.id === editId
                        ? { id: editId, name, email }
                        : u
                )
            );

            setEditId(null);
        } else {
            setUsers([
                ...users,
                { id: Date.now(), name, email }
            ]);
        }

        setName('');
        setEmail('');
    }

    function handleEdit(user) {
        setName(user.name);
        setEmail(user.email);
        setEditId(user.id);
    }

    function handleDelete(id) {
        setUsers(users.filter((u) => u.id !== id));
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            <h2 className="text-2xl font-bold mb-4">
                Users
            </h2>

            <div className="bg-white p-4 rounded shadow mb-6 flex gap-3">

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="border rounded p-2 flex-1"
                />

                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="border rounded p-2 flex-1"
                />

                <button
                    onClick={handleSubmit}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    {editId ? "Update" : "Add User"}
                </button>

            </div>

            <table className="w-full bg-white rounded shadow text-left">

                <thead className="bg-gray-200">
                    <tr>
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="border-t">

                            <td className="p-3">{user.name}</td>
                            <td className="p-3">{user.email}</td>

                            <td className="p-3">

                                <button
                                    onClick={() => handleEdit(user)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => handleDelete(user.id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Delete
                                </button>

                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    );
};

export default Dashboard;