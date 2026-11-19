
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [users, setUsers] = useState([]);
    const [update, setUpdate] = useState("");

    const getUsers = async () => {
        const { data } = await axios.get("http://localhost:5000/users");
        setUsers(data);
    };

    const handleSubmit = async () => {

        if (name === "" || email === "") {
            alert("Please enter name and email");
            return;
        }

        if (update) {
            await axios.post("http://localhost:5000/updateUser", {
                name,
                email,
                _id: update._id
            });
        } else {
            await axios.post("http://localhost:5000/users", {
                name,
                email
            });
        }

        getUsers();

        setName("");
        setEmail("");
        setUpdate("");
        setShowForm(false);
    };

    const handleEdit = (user) => {
        setUpdate(user);
        setName(user.name);
        setEmail(user.email);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        await axios.post("http://localhost:5000/deleteUser", { id });
        getUsers();
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Users</h2>

                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        setUpdate("");
                        setName("");
                        setEmail("");
                    }}
                    className="bg-gray-900 text-white px-4 py-2 rounded"
                >
                    Add
                </button>
            </div>

            {showForm && (
                <div className="bg-white border rounded p-4 mb-6 grid grid-cols-3 gap-3">

                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded px-3 py-2"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border rounded px-3 py-2"
                    />

                    <button
                        onClick={handleSubmit}
                        className="bg-gray-900 text-white px-4 py-2 rounded"
                    >
                        {update ? "Update" : "Save"}
                    </button>

                </div>
            )}

            <table className="w-full bg-white border rounded text-left">

                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3">#</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id} className="border-t">

                            <td className="p-3">{index + 1}</td>
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
                                    onClick={() => handleDelete(user._id)}
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
}

export default Dashboard;
