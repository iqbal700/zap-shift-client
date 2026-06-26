import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2'; 

const AssignedDeliveries = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // ==-== Fetch parcels assigned to this specific rider ==-== //
    const { data: parcels = [], refetch, isLoading } = useQuery({
        queryKey: ['parcels', user?.email, 'assigned to rider'],
        enabled: !!user?.email, 
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/rider?riderEmail=${user.email}&deliveryStatus=assigned to rider`);
            return res.data;
        }
    });

    // ==-== Handle Delivery Status Update (Accept / Reject) ==-== //
    const handleStatusUpdate = (id, status) => {
        Swal.fire({
            title: `Are you sure to ${status} this delivery?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: status === 'accepted' ? "#3085d6" : "#d33",
            cancelButtonColor: "#6b7280",
            confirmButtonText: `Yes, ${status}!`
        }).then((result) => {
            if (result.isConfirmed) {
                // You can send a PATCH request to update the delivery status
                axiosSecure.patch(`/parcels/status/${id}`, { deliveryStatus: status })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();  
                            Swal.fire({
                                title: "Updated!",
                                text: `Delivery has been ${status}.`,
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => {
                        console.error(err);
                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="p-6 bg-base-100 rounded-lg shadow-md m-4">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Assigned Deliveries: {parcels.length}</h2>
                <span className="badge badge-neutral badge-lg font-semibold">
                    New Tasks
                </span>
            </div>

            <div className="overflow-x-auto w-full rounded-lg border border-base-200">
                <table className="table table-zebra w-full">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th>#</th>
                            <th>Parcel Name</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
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
                                    ${parcel.cost}
                                </td>
                                <td>
                                    <span className="badge badge-sm badge-warning capitalize">
                                        {parcel.deliveryStatus}
                                    </span>
                                </td>
                                <td className="text-center">
                                    {
                                        parcel.deliveryStatus !== 'accepted' && parcel.deliveryStatus !== 'parcel picked up' && parcel.deliveryStatus !== 'parcel delivered'  ? <>
                                        
                                        <div className="flex justify-center gap-2">
                                            <button 
                                                onClick={() => handleStatusUpdate(parcel._id, 'accepted')} 
                                                className="btn btn-xs btn-success text-white font-medium"
                                            >
                                                Accept
                                            </button>
                                            <button 
                                                onClick={() => handleStatusUpdate(parcel._id, 'rejected')} 
                                                className="btn btn-xs btn-error text-white font-medium"
                                            >
                                                Reject
                                            </button>
                                      </div>
                                        
                                        </> :
                                        
                                        <>                                                                                                                                                             
                                            <button 
                                                disabled={parcel.deliveryStatus === 'parcel picked up' || parcel.deliveryStatus === 'parcel delivered'}
                                                onClick={() => handleStatusUpdate(parcel._id, 'parcel picked up')} 
                                                className={`btn font-semibold m-4 ${
                                                    parcel.deliveryStatus === 'parcel picked up' ? 'btn-disabled' : 'btn-primary text-black'
                                                }`}
                                            > 
                                                {parcel.deliveryStatus === 'parcel picked up' ? 'Picked Up' : 'Mark as Pickup'}
                                            </button>

                                            <button 
                                                disabled={parcel.deliveryStatus !== 'parcel picked up'}
                                                onClick={() => handleStatusUpdate(parcel._id, 'parcel delivered')} 
                                                className={`btn font-semibold ${
                                                    parcel.deliveryStatus === 'parcel delivered' 
                                                        ? 'btn-success text-white' 
                                                        : parcel.deliveryStatus === 'parcel picked up'
                                                        ? 'btn-secondary text-white' 
                                                        : 'btn-disabled'
                                                }`}
                                            > 
                                                {parcel.deliveryStatus === 'parcel delivered' ? 'Delivered' : 'Mark as Delivered'}
                                            </button>
                                        </>
                                        
                                        
                                       
                                    }
                                </td>
                            </tr>
                        ))}
                        {parcels.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-500 py-8">
                                    No assigned deliveries found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AssignedDeliveries;