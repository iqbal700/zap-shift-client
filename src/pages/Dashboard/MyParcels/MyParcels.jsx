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
          console.log("Deleting Parcel ID:", id);
          
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
                  
                  // Send DELETE request to the backend
                  axiosSecure.delete(`/parcels/${id}`)
                      .then(res => {
                          console.log("Server Response:", res.data);
                          
                          // Safe check if the document was actually deleted
                          if (res.data.deletedCount > 0) {
                              refetch(); // Automatically refresh the UI data
                              
                              Swal.fire({
                                  title: "Successful!",
                                  text: "Your parcel has been deleted.",
                                  icon: "success"
                              });
                          }
                      })
                      .catch(err => {
                          console.error("Delete API Error:", err);
                          
                          // Alert user if something goes wrong with the server
                          Swal.fire({
                              title: "Error!",
                              text: "Something went wrong. Could not delete the parcel.",
                              icon: "error"
                          });
                      });
              }
          });
      };



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
          <th>Delivery Status</th>
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
                  <td>
                    
                     <Link to={`/tracking-parcel/${parcel.trackingId}`}>   {parcel.trackingId} </Link>
                     
                  </td>
                 
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
        
      </tbody>
    </table>
  </div>
          </div>
    );
};

export default MyParcels;