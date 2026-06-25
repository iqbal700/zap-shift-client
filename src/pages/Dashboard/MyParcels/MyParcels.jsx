import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaMagnifyingGlass, FaTrashCan } from 'react-icons/fa6';
import { FiEdit } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { Link } from 'react-router';

const MyParcels = () => {

    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: parcels = [], refetch } = useQuery({

        queryKey: ['my-parcels', user?.email ],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data;
        }
    })

      const handleParcelDelete = id => {
          console.log(id);
          Swal.fire({
                      title: `Are You confirmed to delete it ?`,
                      text: "You won't be able to revert this!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: " agree!"
                      }).then((result) => {
                      if (result.isConfirmed) {
                                                       
                        // ==-== Delete api with the confirmation messages ==-=
                           
                        axiosSecure.delete(`/parcels/${id}`)
                          .then(res => {
                            console.log(res.data)
                            if(res.data.deletedCount) {
                                 refetch(); // => refresh the data after delete automatically
                                   Swal.fire({
                                      title: "successfull!",
                                      text: "Your parcels Deleted.",
                                      icon: "success"});
                            }
                          })                        
                                     
                      }});
      }



    return (
        <div>
            <h2>All of my Parcels here {parcels.length} </h2>
            <div className="overflow-x-auto">
    <table className="table table-zebra">
      {/* head */}
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Cost</th>
          <th>Payment</th>
          <th>Tracking Id </th>
          <th>Delivary Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>

          {
              parcels.map((parcel, i)  =>
              <tr key={parcel._id} >
                  <th>{i + 1}</th>
                  <td>{parcel.parcelName} </td>
                  <td>{parcel.cost} </td>
                  <td>
                     
                     {
                       parcel.paymentStatus === 'paid' ? 
                       <span className='text-green-500'> Paid </span>
                       :
                        <Link to={`/dashboard/payment/${parcel._id}`} className='btn  text-black btn-primary'>Pay</Link>
                     }
                     
                  </td>
                  <td> {parcel.trackingId} </td>
                 
                  <td>  {parcel.deliveryStatus} </td>
                   <td>
                    <button className='btn btn-square hover:bg-primary'>
                      <FaMagnifyingGlass/>
                    </button>
                    <button className='btn btn-square hover:bg-primary mx-2'>
                      <FiEdit/>
                    </button>
                    <button onClick={() => handleParcelDelete(parcel._id)} className='btn btn-square hover:bg-primary'>
                      <FaTrashCan/>
                    </button>
                    
                  </td>
              </tr>)
          }

        {/* row 1 */}
        
      </tbody>
    </table>
  </div>
          </div>
    );
};

export default MyParcels;