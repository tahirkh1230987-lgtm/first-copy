import { useState } from "react";

function Users() {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [users, setUsers] = useState([
        { id: 1, name: "Ali", email: "ali@gmail.com" },
        { id: 2, name: "Ahmed", email: "ahmed@gmail.com" },
    ]);

    const handleSubmit = () => {
        if (name.trim() === "" || email.trim() === "") {
            alert("Please enter name and email");
            return;
        }

        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
        };

        setUsers([...users, newUser]);

        setName("");
        setEmail("");
        setShowForm(false);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Users</h1>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-gray-900 text-white px-4 py-2 rounded"
                >
                    Add
                </button>
            </div>

            {showForm && (
                <div className="bg-white border rounded p-4 mb-6 flex gap-3">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 border rounded px-3 py-2"
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 border rounded px-3 py-2"
                    />

                    <button
                        onClick={handleSubmit}
                        className="bg-gray-900 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                </div>
            )}

            <table className="w-full bg-white border rounded text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3">#</th>
                        <th className="p-3">Name</th>
                        <th className="p-3">Email</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id} className="border-t">
                            <td className="p-3">{index + 1}</td>
                            <td className="p-3">{user.name}</td>
                            <td className="p-3">{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default Users;