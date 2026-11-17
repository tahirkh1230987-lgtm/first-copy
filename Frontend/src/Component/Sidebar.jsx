
import { useState } from "react";

const menu = [
    { name: "Dashboard", icon: "🏠" },
    { name: "Projects", icon: "📁" },
    { name: "Team", icon: "👥" },
    { name: "Settings", icon: "⚙️" },
];

function Sidebar() {
    const [active, setActive] = useState("Dashboard");

    return (
        <div className="flex h-screen">
            <div className="w-60 bg-gray-900 text-white p-4">
                <h1 className="text-xl font-bold mb-6">My App</h1>

                <ul>
                    {menu.map((item) => (
                        <li
                            key={item.name}
                            onClick={() => setActive(item.name)}
                            className={
                                active === item.name
                                    ? "p-3 rounded cursor-pointer bg-blue-600"
                                    : "p-3 rounded cursor-pointer hover:bg-gray-700"
                            }
                        >
                            {item.icon} {item.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex-1 p-6 bg-gray-100">
                <h2 className="text-2xl font-bold">{active}</h2>
            </div>
        </div>
    );
}

export default Sidebar;
