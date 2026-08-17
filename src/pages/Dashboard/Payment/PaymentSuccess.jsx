import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router'; 
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [paymentInfo, setPaymentInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const hasCalledRef = useRef(false);

    useEffect(() => {
        if (sessionId && !hasCalledRef.current) {
            hasCalledRef.current = true;

            axiosSecure.patch(`/payment-verify/?session_id=${sessionId}`)
                .then(res => {
                    setPaymentInfo({
                        transactionId: res.data.transactionId,
                        trackingId: res.data.trackingId
                    });
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Verification failed:", err);
                    hasCalledRef.current = false;
                    setError(true);
                    setLoading(false);
                });
        } else if (!sessionId) {
            setLoading(false);
            setError(true);
        }
    }, [axiosSecure, sessionId]);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
                <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-600 mb-4"></div>
                <p className="text-gray-600 font-medium animate-pulse">Verifying your payment, please wait...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-red-100">
                    <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✕</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Verification Failed</h2>
                    <p className="text-gray-500 mb-6">Something went wrong or your session is invalid. Please contact support if the amount was deducted.</p>
                    <button 
                        onClick={() => navigate('/')}
                        className="w-full bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 rounded-xl transition duration-200"
                    >
                        Go to Homepage
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-100 p-4 font-sans">
            <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full text-center relative overflow-hidden border border-indigo-50">
                <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-blue-600 to-indigo-600"></div>
                <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner border border-blue-100 animate-bounce">
                    ✓
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Payment Successful!</h2>
                <p className="text-gray-500 mb-8">Thank you for your payment. Your transaction has been completed successfully.</p>
                {paymentInfo && (
                    <div className="bg-slate-50/80 rounded-2xl p-5 mb-8 text-left border border-slate-100 space-y-4">
                        <div className="flex justify-between items-center border-b border-gray-200 pb-3">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Payment Details</span>
                            <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded-full font-semibold">Paid</span>
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 block mb-0.5">Transaction ID</label>
                            <span className="text-sm font-mono font-bold text-gray-700 bg-white px-2 py-1 rounded border border-gray-200 block overflow-x-auto">
                                {paymentInfo.transactionId || 'N/A'}
                            </span>
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 block mb-0.5">Tracking ID</label>
                            <span className="text-sm font-mono font-bold text-indigo-600 bg-white px-2 py-1 rounded border border-gray-200 block">
                                {paymentInfo.trackingId || 'N/A'}
                            </span>
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                    <button 
                        onClick={() => navigate('/dashboard/my-parcels')}
                        className="bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition duration-200 shadow-lg shadow-indigo-200 text-sm"
                    >
                        Track Parcel
                    </button>
                    <button 
                        onClick={() => navigate('/')}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3 px-4 rounded-xl transition duration-200 text-sm"
                    >
                        Go to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccess;