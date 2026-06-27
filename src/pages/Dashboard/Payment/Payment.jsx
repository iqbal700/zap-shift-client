import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Payment = () => {

    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();

    const {isLoading, data: parcel} = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    })

     const handlePayment = async() => {
         const paymentInfo = {
            cost : parcel.cost,
            parcelId : parcel._id,
            senderEmail : parcel.senderEmail,
            parcelName : parcel.parcelName,
            trackingId: parcel.trackingId
         }

         const res = await axiosSecure.post('/create-checkout-session', paymentInfo);

         console.log(res.data);
         window.location.assign(res.data.url);
        
     }

    if(isLoading) {
       return <span> loading....</span>
    }

    if (!parcel) {
        return <div className="text-center my-10 text-red-500">Parcel data not found!</div>;
    }

    console.log(parcel)


    return (
        <div>
            <p>please clear your payment {parcel.cost} </p>
            <button onClick={handlePayment} className='btn btn-primary text-black'> pay </button>
        </div>
    );
};

export default Payment;