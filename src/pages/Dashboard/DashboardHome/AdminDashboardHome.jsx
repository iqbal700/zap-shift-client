import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

const AdminDashboardHome = () => {
    const axiosSecure = useAxiosSecure(); 

    const { data: deliveryStats = [] } = useQuery({
        queryKey: ['deliveryStatus-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels/deliveryStatus/stats'); 
            return res.data;
        }
    });

    // Fixed: Added top-level return and mapped the correct MongoDB keys (_id and totalCount)
    const getBarChartData = data => {
        return data.map(item => {
            return {
                name: item._id || 'Unknown',
                value: item.totalCount
            };
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {
                    deliveryStats.map((stat, index) => (
                        <div key={index} className="card bg-base-100 shadow-md border p-5">
                            <p className="text-sm font-semibold text-gray-500 capitalize">
                                {stat._id || 'Unknown'}
                            </p>
                            <h3 className="text-3xl font-bold mt-2 text-primary">
                                {stat.totalCount}
                            </h3>
                        </div>
                    ))
                }
            </div>

            <div className='w-full mt-10'>
                 <BarChart
                    width={700}
                    height={400}
                    data={getBarChartData(deliveryStats)}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                 >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {/* Fixed: Changed dataKey to "value" to match the helper function object output */}
                    <Bar dataKey="value" fill="#4f46e5" radius={[10, 10, 0, 0]} name="Total Parcels" />
                 </BarChart>
            </div>
        </div>
    );
};

export default AdminDashboardHome;