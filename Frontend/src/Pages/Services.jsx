import { useState } from "react";

function Services() {
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const [services, setServices] = useState([
        { id: 1, name: "Web Development", price: 5000 },
        { id: 2, name: "Graphic Design", price: 3000 },
        { id: 3, name: "SEO", price: 2000 },
    ]);

    const handleSubmit = () => {
        if (name.trim() === "" || price === "") {
            alert("Please enter service name and price");
            return;
        }

        const newService = {
            id: Date.now(),
            name: name,
            price: Number(price),
        };

        setServices([...services, newService]);

        setName("");
        setPrice("");
        setShowForm(false);
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">

            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-semibold">Services</h1>

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-gray-900 text-white px-4 py-2 rounded"
                >
                    Add
                </button>
            </div>

            {showForm && (
                <div className="bg-white border rounded p-4 mb-6 grid grid-cols-3 gap-3">

                    <input
                        type="text"
                        placeholder="Service Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border rounded px-3 py-2"
                    />

                    <input
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="border rounded px-3 py-2"
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
                        <th className="p-3">Service Name</th>
                        <th className="p-3">Price</th>
                    </tr>
                </thead>

                <tbody>
                    {services.map((service, index) => (
                        <tr key={service.id} className="border-t">
                            <td className="p-3">{index + 1}</td>
                            <td className="p-3">{service.name}</td>
                            <td className="p-3">{service.price}</td>
                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    );
}

export default Services;