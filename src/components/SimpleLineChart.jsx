import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SimpleLineChart = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/products');
        const products = await response.json();
        
        // محاسبه تعداد فروش هر محصول
        const salesByProduct = products.map(product => {
          const totalSales = product.comments.length; // تعداد نظرات به عنوان تعداد فروش
          return {
            name: product.title,
            sales: totalSales,
          };
        });

        setSalesData(salesByProduct);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={salesData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="name" 
          angle={-45}
          textAnchor="end"
          height={100}
          interval={0}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="sales"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          name="تعداد فروش"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default SimpleLineChart;
