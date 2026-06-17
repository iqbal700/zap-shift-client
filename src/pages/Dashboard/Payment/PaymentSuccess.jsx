import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {

    // to grab the special id from url in the payment tab after the ques mark session_id
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [paymentInfo, setPaymentInfo] = useState({});
    const axiosSecure = useAxiosSecure();
    console.log(sessionId)

    useEffect(() => {
        if(sessionId) {
            console.log('hello')
            axiosSecure.patch(`/payment-verify/?session_id=${sessionId}`)
              .then(res => {
                setPaymentInfo({
                    transactionId : res.data.transactionId,
                    trackingId: res.data.trackingId
                })
                console.log(res.data)
            })
        }
    },[axiosSecure, sessionId])

    return (
        <div>
            <p>Your payment is successfully done </p>
            <p>  {paymentInfo.transactionId}  </p>
            <p>  {paymentInfo.trackingId}  </p>
        </div>
    );
};

export default PaymentSuccess;