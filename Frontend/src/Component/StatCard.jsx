
const stats = [
    { title: "Total Users", value: "1,250", icon: "👥", color: "bg-blue-500" },
    { title: "Total Sales", value: "$8,400", icon: "💰", color: "bg-green-500" },
    { title: "New Orders", value: "320", icon: "📦", color: "bg-orange-500" },
];

function StatCard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-100">
            {stats.map((item) => (
                <div
                    key={item.title}
                    className="bg-white rounded-lg shadow p-5 flex items-center justify-between"
                >
                    <div>
                        <p className="text-gray-500 text-sm">{item.title}</p>
                        <h3 className="text-2xl font-bold">{item.value}</h3>
                    </div>

                    <div
                        className={`${item.color} text-white text-2xl w-12 h-12 rounded-full flex items-center justify-center`}
                    >
                        {item.icon}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StatCard;
