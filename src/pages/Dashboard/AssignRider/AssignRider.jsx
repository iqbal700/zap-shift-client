import { useQuery } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AssignRider = () => {
    const axiosSecure = useAxiosSecure();
    const riderModalRef = useRef();
    const [selectedParcel, setSelectedParcel] = useState(null);  //

    // ==-== Parcels Query for getting/showing only pending-pickup parcels ==-==//
    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ['parcels', 'pending-pickup'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?deliveryStatus=pending-pickup');
            return res.data;
        }
    });

    // ==-== Riders Query for showing available riders based on parcel SenderDistrict ==-== //
    const {data: riders = [], refetch } = useQuery({
        queryKey: ['riders', selectedParcel?.senderDistrict, 'available'],
        enabled: !!selectedParcel && !!selectedParcel?.senderDistrict,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?status=approved&district=${selectedParcel.senderDistrict}&workStatus=available`);
            //console.log("Riders Data from Server:", res.data);
            return res.data;
        }
    });

    // ==-== Open modal and update selected parcel state ==-== //
    const openAssignRiderModal = parcel => {
        setSelectedParcel(parcel);
        riderModalRef.current.showModal();
       // console.log('openModal handle: ', parcel);
    };

    // Assign button
    const handleAssignRider = rider => {

             riderModalRef.current.close();  // ==-== after clicking assign then modal vanish ==-== //
                Swal.fire({
                    title: `Are You confirmed to Assign it ?`,
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: " agree!"
                    }).then( (res) => {
                    if (res.isConfirmed) {
                       
                        const riderInfo = {
                                riderId : rider._id,
                                riderEmail: rider.email,
                                riderName: rider.name,
                                parcelId : selectedParcel._id,
                                trackingId: selectedParcel.trackingId
                              }
                                
                         axiosSecure.patch(`/parcels/${selectedParcel._id}`, riderInfo)
                            .then(res => {
                                if(res.data.modifiedCount) {
                                    
                                    refetch(); // => refresh the data after assign
                                    Swal.fire({
                                        title: "successfull!",
                                        text: "Your product assigned to rider.",
                                        icon: "success"});
                                }
                         })}}) }
    



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
                <h2 className="text-2xl font-bold text-gray-800"> Available Rider: {riders.length}</h2>
                <span className="badge badge-primary text-black badge-lg font-semibold">
                    Pending Pickups: {parcels.length}
                </span>
            </div>

            <div className="overflow-x-auto w-full rounded-lg border border-base-200">
                <table className="table table-zebra w-full">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Cost</th>
                            <th>Created At</th>
                            <th>Pickup District</th>
                            <th className="text-center">Action</th>
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
                                <td className="text-gray-500">
                                    {parcel.createdAt ? new Date(parcel.createdAt).toLocaleDateString() : 'N/A'}
                                </td>
                                <td className="text-gray-600">
                                    {parcel.senderDistrict}
                                </td>
                                <td className="text-center">
                                    <button onClick={() => openAssignRiderModal(parcel)} className="btn btn-sm btn-primary text-black font-medium">
                                        Find Rider
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {parcels.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center text-gray-500 py-8">
                                    No pending pickup parcels found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ==-== Modal UI from DaisyUI ==-== */}
            <dialog ref={riderModalRef} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box max-w-2xl w-11/12">
                    <h3 className="font-bold text-xl mb-4 text-gray-800 border-b pb-2">
                        Available Riders: {riders.length}
                    </h3>
                    
                    {/* Available Riders Details Table */}
                    <div className="overflow-x-auto max-h-60 border border-base-200 rounded-lg">
                        <table className="table table-sm table-zebra w-full">
                            <thead className="bg-base-200 sticky top-0 z-10">
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {riders.map((rider, idx) => (
                                    <tr key={rider._id || idx} className="hover">
                                        <th>{idx + 1}</th>
                                        <td className="font-medium">{rider.name || "N/A"}</td>
                                        <td>{rider.email}</td>
                                        <td className="text-center">
                                            <button 
                                               // onClick={() => console.log(`Assigning rider ${rider._id} to parcel ${selectedParcel?._id}`)} 
                                               onClick={() => handleAssignRider(rider)}
                                                className="btn btn-xs btn-success text-white font-semibold"
                                            >
                                                Assign
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {riders.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className="text-center text-gray-500 py-4">
                                            No available riders found for this district.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="modal-action mt-6">
                        <form method="dialog">
                            {/* Closing the form button closes the modal window */}
                            <button className="btn btn-sm btn-outline">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AssignRider;