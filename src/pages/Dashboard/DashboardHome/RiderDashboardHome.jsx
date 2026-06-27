import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const RiderDashboardHome = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth(); 
    
    // Fallback check: use user?.email if user?.riderEmail isn't explicitly configured in AuthContext
    const riderEmail = user?.email || user?.riderEmail;

    const { data: deliveryStats = [], isLoading, isError, error } = useQuery({
        queryKey: ['rider-delivery-stats', riderEmail],
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders/delivery-par-day?email=${riderEmail}`);
            return res.data;
        },
        enabled: !!riderEmail, // Prevents running query on initial render before auth loads
    });

    // Calculates life-time deliveries dynamically using the pipeline's totalDelivered fields
    const totalLifetimeDeliveries = deliveryStats.reduce((acc, curr) => acc + curr.totalDelivered, 0);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-100">
                <span className="loading loading-bars loading-lg text-primary"></span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-6 max-w-4xl text-center">
                <div className="alert alert-error shadow-sm">
                    <span>Failed to load delivery analytics: {error?.message || "Server Error"}</span>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-4xl">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-base-content">Rider Dashboard</h2>
                <p className="text-sm text-base-content/60 mt-1">Your real-time daily delivery analytics</p>
            </div>

            {/* Overview Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="card bg-base-100 border shadow-sm p-6">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Active Workdays</p>
                    <h3 className="text-4xl font-extrabold mt-2 text-primary">{deliveryStats.length} Days</h3>
                </div>
                <div className="card bg-base-100 border shadow-sm p-6">
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Lifetime Deliveries</p>
                    <h3 className="text-4xl font-extrabold mt-2 text-success">{totalLifetimeDeliveries}</h3>
                </div>
            </div>

            {/* Daily Records List */}
            <div className="card bg-base-100 border shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4 text-base-content">Daily Delivery Breakdown</h3>
                
                {
                    deliveryStats.length > 0 ? (
                        <div className="divide-y divide-base-200">
                            {deliveryStats.map((stat) => (
                                <div key={stat._id} className="flex justify-between items-center py-4">
                                    <div>
                                        {/* Matches the format: %Y-%m-%d from your pipeline */}
                                        <p className="font-semibold text-base-content">{stat._id}</p>
                                        <p className="text-xs text-gray-400">Completed Deliveries</p>
                                    </div>
                                    <div className="badge badge-neutral badge-lg py-4 px-5 font-bold">
                                        {stat.totalDelivered} Parcels
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 text-base-content/50">
                            No delivered parcels record found yet!
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default RiderDashboardHome;

