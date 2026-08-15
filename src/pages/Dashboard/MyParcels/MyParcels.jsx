import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'; 
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaMagnifyingGlass, FaTrashCan } from 'react-icons/fa6';
import { FiEdit } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyParcels = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    
    // store the specefic payment parcel id
    const [loadingPaymentId, setLoadingPaymentId] = useState(null);

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    });

    const handleParcelDelete = id => {
        Swal.fire({
            title: "Are you sure you want to delete it?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Successful!",
                                text: "Your parcel has been deleted.",
                                icon: "success"
                            });
                        }
                    })
                    .catch(err => {
                        Swal.fire({
                            title: "Error!",
                            text: "Something went wrong. Could not delete the parcel.",
                            icon: "error"
                        });
                    });
            }
        });
    };

    
    const handlePayment = async (parcelInfo) => {
        try {
            setLoadingPaymentId(parcelInfo._id);

            const paymentInfo = {
                cost: parcelInfo.cost,
                parcelId: parcelInfo._id,
                senderEmail: parcelInfo.senderEmail,
                parcelName: parcelInfo.parcelName,
                trackingId: parcelInfo.trackingId
            };
            
            const res = await axiosSecure.post('/create-checkout-session', paymentInfo);
            window.location.assign(res.data.url);
        } catch (error) {
            console.error("Payment Error:", error);
            setLoadingPaymentId(null); 
        }
    };

    return (
        <div>
            <h2>All of my Parcels here {parcels.length} </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Tracking Id</th>
                            <th>Delivery Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, i) => (
                            <tr key={parcel._id}>
                                <th>{i + 1}</th>
                                <td>{parcel.parcelName}</td>
                                <td>{parcel.cost}</td>
                                <td>
                                    {parcel.paymentStatus === 'paid' ? (
                                        <span className='text-green-500 font-semibold'>Paid</span>
                                    ) : (
                                        <button 
                                            onClick={() => handlePayment(parcel)} 
                                            disabled={loadingPaymentId === parcel._id}
                                            className='btn btn-primary text-black btn-sm'
                                        >
                                            {loadingPaymentId === parcel._id ? (
                                                <span className="loading loading-spinner loading-xs"></span>
                                            ) : (
                                                'Pay'
                                            )}
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <Link to={`/tracking-parcel/${parcel.trackingId}`}>
                                        {parcel.trackingId}
                                    </Link>
                                </td>
                                <td>{parcel.deliveryStatus}</td>
                                <td>
                                    <button className='btn btn-square hover:bg-primary btn-sm'>
                                        <FaMagnifyingGlass />
                                    </button>
                                    <button className='btn btn-square hover:bg-primary mx-2 btn-sm'>
                                        <FiEdit />
                                    </button>
                                    <button onClick={() => handleParcelDelete(parcel._id)} className='btn btn-square hover:bg-primary btn-sm'>
                                        <FaTrashCan />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyParcels;