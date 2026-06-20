import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaEye } from 'react-icons/fa'; 

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`);
            return res.data;
        }
    });

    return (
        <div className="p-6 bg-base-100 rounded-xl shadow-sm">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Payment History</h2>
                    <p className="text-sm text-gray-500">View all your successful transactions</p>
                </div>
                <div className="badge badge-primary p-4 text-white font-semibold">
                    Total Payments: {payments.length}
                </div>
            </div>

            {/* Dynamic Table Container */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="table w-full min-w-[800px]">
                    <thead className="bg-gray-50 text-gray-700 font-bold text-sm">
                        <tr>
                            <th>#</th>
                            <th>Parcel Info</th>
                            <th>Recipient/Email</th>
                            <th>Transaction ID</th>
                            <th>Amount & Status</th>
                            <th>Paid Date</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    
                    <tbody className="divide-y divide-gray-100 text-gray-600">
                        {payments.map((payment, index) => (
                            <tr key={payment._id || index} className="hover:bg-gray-50 transition-colors">
                                <td>{index + 1}</td>
                                
                                {/* Parcel Info */}
                                <td className="font-semibold text-gray-800">
                                    {payment.parcelName}
                                    <span className="block text-xs font-normal text-gray-400 mt-0.5">
                                        ID: {payment.parcelId}
                                    </span>
                                </td>
                                
                                {/* Recipient Email Info */}
                                <td>
                                    <span className="text-sm block font-medium text-gray-700">
                                        {payment.customerEmail.split('@')[0]}
                                    </span>
                                    <span className="text-xs text-gray-400 block">
                                        {payment.customerEmail}
                                    </span>
                                </td>
                                
                                {/* Transaction ID */}
                                <td className="font-mono text-xs text-blue-600 font-medium">
                                    {payment.transactionId}
                                </td>
                                
                                {/* Payment Status & Amount */}
                                <td>
                                    <span className="font-bold text-gray-800 block">
                                        ${payment.amount} <span className="text-xs font-normal text-gray-400 uppercase">{payment.currency}</span>
                                    </span>
                                    <span className="badge badge-success badge-sm text-white capitalize mt-1 px-2 py-0.5 text-[10px]">
                                        {payment.paymentStatus}
                                    </span>
                                </td>
                                
                                {/* Formatted Paid Date */}
                                <td className="text-sm">
                                    {new Date(payment.paidAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    })}
                                </td>
                                
                                {/* Action Button */}
                                <td className="text-center">
                                    <button 
                                        onClick={() => console.log('Viewing details for:', payment._id)}
                                        className="btn btn-ghost btn-sm text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-full"
                                        title="View Details"
                                    >
                                        <FaEye size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Empty State */}
                {payments.length === 0 && (
                    <div className="text-center py-12 text-gray-400 bg-white">
                        No payment records found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentHistory;