import React from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';

const TrackingParcel = () => {
    const { trackingId } = useParams();
    const axiosInstance = useAxios();

    console.log("trackingId:",trackingId)

    const { data: trackingData = [], isLoading, isError, error } = useQuery({
        queryKey: ['tracking', trackingId],
        queryFn: async () => {
            const res = await axiosInstance.get(`/trackings/${trackingId}/logs`);
            return res.data;
        },
        enabled: !!trackingId,
    });

    const formatTime = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="max-w-xl mx-auto my-10 p-5 bg-white shadow-lg rounded-lg">
            <h2 className='text-primary font-bold text-2xl mb-8 border-b pb-4 text-center'>
                Track Your Parcel : <span className="text-gray-700 font-semibold">{trackingId}</span>
            </h2>

            {isLoading && (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
                </div>
            )}

            {isError && (
                <div className="text-center text-red-600 bg-red-50 p-4 rounded-md border border-red-200">
                    {error.message}
                </div>
            )}

            {!isLoading && !isError && trackingData.length > 0 && (
                <div className="relative border-l-4 border-primary/30 ml-4 md:ml-6 space-y-8">
                    {
                        trackingData.map((step) => (
                            <div key={step._id} className="relative pl-6 md:pl-8">
                                
                                <span className="absolute -left-3.5 top-1 bg-primary w-6 h-6 rounded-full border-4 border-white shadow-md flex items-center justify-center">
                                    <span className="w-2 h-2 bg-white rounded-full"></span>
                                </span>

                                <div className="bg-primary/5 p-4 rounded-lg shadow-sm border border-primary/10 transition-transform hover:scale-[1.01]">
                                    <h3 className="text-lg font-bold text-primary capitalize">
                                        {step.status}
                                    </h3>
                                    <p className="text-gray-600 text-sm mt-1 capitalize">
                                        {step.details}
                                    </p>
                                    <span className="text-xs text-gray-400 block mt-2 font-medium">
                                        {formatTime(step.createdAt)}
                                    </span>
                                </div>

                            </div>
                        ))
                    }
                </div>
            )}

            {!isLoading && !isError && trackingData.length === 0 && (
                <p className="text-center text-gray-500 py-6">No tracking information found for this ID.</p>
            )}
        </div>
    );
};

export default TrackingParcel;