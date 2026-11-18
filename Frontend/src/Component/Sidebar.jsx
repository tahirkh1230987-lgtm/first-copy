import { NavLink } from "react-router-dom";

const menu = [
    { name: "Dashboard", path: "/Dashboard" },
    { name: "Users", path: "/Users" },
    { name: "Services", path: "/Services" },
];

function Sidebar() {
    return (
        <div className="w-60 bg-gray-900 text-white p-4 min-h-screen">
            <h1 className="text-xl font-bold mb-6">My App</h1>

            <ul>
                {menu.map((item) => (
                    <li key={item.name}>
                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                isActive
                                    ? "block p-3 rounded bg-blue-600"
                                    : "block p-3 rounded hover:bg-gray-700"
                            }
                        >
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sidebar;