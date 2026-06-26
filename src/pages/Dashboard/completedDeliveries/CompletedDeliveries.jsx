import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const CompletedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // ==-== Fetch parcels assigned to this specific rider ==-== //
    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ['parcels', user?.email, 'parcel delivered'], // Unique query key for completed deliveries
        enabled: !!user?.email, 
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=parcel delivered`);
            return res.data;
        }
    });

    // Loading state indicator
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-50">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }


    const calculatePayment = parcel => {
        if(parcel.senderDistrict === parcel.receiverDistrict) {
            return parcel.cost * 0.8
        } else {
            return parcel.cost * 0.6
        }
    }


    return (
        <div className="p-6 bg-base-100 rounded-lg shadow-md m-4">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                    Completed Deliveries: <span className="text-success">{parcels.length}</span>
                </h2>
                <span className="badge badge-success badge-lg font-semibold text-white">
                    Success History
                </span>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto w-full rounded-lg border border-base-200">
                <table className="table table-zebra w-full">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th>#</th>
                            <th>Parcel Name</th>
                            <th>Cost</th>
                            <th>Your Payment</th>
                            <th>Status</th>
                            <th className="text-center">Delivery Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id || index} className="hover">
                                <th>{index + 1}</th>
                                <td className="font-semibold text-gray-800">
                                    {parcel.parcelName}
                                </td>
                                <td className="text-gray-600 font-medium">
                                    {parcel.cost}
                                </td>
                                <td className="text-gray-600 font-medium">
                                    {calculatePayment(parcel)}
                                </td>
                                <td>
                                    <span className="badge badge-sm badge-success text-white capitalize font-medium">
                                        {parcel.deliveryStatus}
                                    </span>
                                </td>
                                <td className="text-center text-gray-600 font-medium">
                                    {/* Displays formatted date if updatedAt timestamp is available */}
                                    {parcel.deliveredAt ? new Date(parcel.deliveredAt).toLocaleDateString() : 'N/A'}
                                </td>
                            </tr>
                        ))}

                        {/* Fallback view when no completed deliveries are found */}
                        {parcels.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-500 py-12">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.25 2.25 0 0 1 10.5 2.25h4.5a2.25 2.25 0 0 1 2.25 2.25m-5.8 0a48.667 48.667 0 0 0-3.478.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m-3.478.397v13.5A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 14.25 9.75m0 0A11.963 11.963 0 0 0 12 12m2.25-2.25a11.962 11.962 0 0 1 2.25 2.25M12 12a11.963 11.963 0 0 1-2.25-2.25M12 12v4.5" />
                                        </svg>
                                        <span>No completed deliveries found yet.</span>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CompletedDeliveries;