import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { FaCheck, FaEye, FaTimes, FaTrashAlt } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';


const ApproveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
  
    // Fetch pending riders
    const { data: riders = [], refetch } = useQuery({
        queryKey: ['riders', 'pending'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders');
            return res.data;
        }
    });

    // Mutation for Approving, Rejecting & Deleting Riders
    const riderActionMutation = useMutation({
        mutationFn: async ({ id, actionType }) => {
            let res;
            if (actionType === 'approve') {
                res = await axiosSecure.patch(`/riders/approve/${id}`);
            } else if (actionType === 'reject') {
                res = await axiosSecure.patch(`/riders/reject/${id}`);
            } else if (actionType === 'delete') {
                res = await axiosSecure.delete(`/riders/delete/${id}`);
            }
            return console.log(res.data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['riders', 'pending'] });
            refetch();
        },
        onError: (err) => {
            console.error("Action failed:", err.message);
        }
    });

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            
            {/* Header Section */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-[#063535]">
                    Riders pending Approval : <span className="text-[#063535]">{riders.length}</span>
                </h2>
                <p className="text-gray-500 text-sm mt-1">Review, approve, reject, or delete pending rider profiles.</p>
            </div>

            {/* Responsive Table Container */}
            <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="text-black text-sm border-b border-gray-200 bg-gray-50">
                            <th className="py-4 rounded-tl-lg"></th>
                            <th className="py-4">Name</th>
                            <th className="py-4">Email</th>
                            <th className="py-4">District</th>
                            <th className="py-4">Status</th>
                            <th className="py-4">Work Status</th>
                            <th className="py-4 rounded-tr-lg text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="text-sm text-gray-700">
                        {
    riders.length > 0 ? (
        riders.map((rider, index) => { 
            return (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <th className="font-bold text-[#063535]">{index + 1}</th>
                    <td className="font-medium text-gray-900"> {rider.name} </td>
                    <td> {rider.email} </td>
                    <td> {rider.riderDistrict}</td>
                    <td> 
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            rider.status === 'approved' ? 'text-green-800 bg-green-100' : 'text-red-600 bg-red-100' 
                        }`}>
                            {rider.status || "Pending"}
                        </span>
                    </td>
                     <td> {rider.workStatus}</td>
                    
                    {/* Unified Action Buttons Cell */}
                    <td className="py-4">
                        <div className="flex items-center justify-center gap-4">
                            {/* details Eye button  */}
                            <button className='btn border-none bg-none'>
                                <FaEye/>
                            </button>
                            
                            {/* Approve Button */}
                            <button 
                                onClick={() => riderActionMutation.mutate({ id: rider._id, actionType: 'approve' })}
                                disabled={riderActionMutation.isPending}
                                className="text-emerald-600 hover:text-emerald-800 transition-colors p-1 hover:bg-emerald-50 rounded disabled:opacity-50"
                                title="Approve Rider"
                            >
                                <FaCheck className="w-4 h-4" />
                            </button>

                            {/* Reject Button */}
                            <button 
                                onClick={() => {
                                    if(window.confirm("Are you sure you want to reject this rider application?")) {
                                        riderActionMutation.mutate({ id: rider._id, actionType: 'reject' });
                                    }
                                }}
                                disabled={riderActionMutation.isPending}
                                className="text-amber-500 hover:text-amber-700 transition-colors p-1 hover:bg-amber-50 rounded disabled:opacity-50"
                                title="Reject Rider"
                            >
                                <FaTimes className="w-4 h-4" />
                            </button>

                            {/* Delete Button */}
                            <button 
                                onClick={() => {
                                    if(window.confirm("Are you sure you want to permanently delete this account record?")) {
                                        riderActionMutation.mutate({ id: rider._id, actionType: 'delete' });
                                    }
                                }}
                                disabled={riderActionMutation.isPending}
                                className="text-rose-600 hover:text-rose-800 transition-colors p-1 hover:bg-rose-50 rounded disabled:opacity-50"
                                title="Delete Rider Record"
                            >
                                <FaTrashAlt className="w-4 h-4" />
                            </button>
                        </div>
                    </td>
                </tr>
            )
        })
            ) : (
                <tr>
                    <td colSpan="6" className="text-center py-8 text-gray-400 italic">
                        No riders pending approval.
                    </td>
                </tr>
            )
        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApproveRiders;