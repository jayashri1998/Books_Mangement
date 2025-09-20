import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { name: "Novel", value: 12 },
  { name: "Science", value: 8 },
  { name: "History", value: 5 },
  { name: "Biography", value: 10 },
];

const COLORS = ["#f87171", "#3b82f6", "#facc15", "#22d3ee"];

const CategoryChart = () => {
  return (
    <div className="  w-full">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Category Distribution
      </h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            dataKey="value"
            label={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
