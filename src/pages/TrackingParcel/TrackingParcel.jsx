import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';

const TrackingParcel = () => {
    const { trackingId } = useParams();
    const navigate = useNavigate();
    const axiosInstance = useAxios();
    const [searchInput, setSearchInput] = useState(trackingId || '');

    // Fetch tracking logs
    const { data: trackingData = [], isLoading, isError, error } = useQuery({
        queryKey: ['tracking', trackingId],
        queryFn: async () => {
            const res = await axiosInstance.get(`/trackings/${trackingId}/logs`);
            return res.data;
        },
        enabled: !!trackingId,
    });

    // Handle search form submission
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput.trim()) {
            navigate(`/track/${searchInput.trim()}`);
        }
    };

    // Format Date & Time for timeline
    const formatDate = (dateString) => {
        if (!dateString) return { date: 'N/A', time: '' };
        const d = new Date(dateString);
        const date = d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
        const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();
        return { date, time };
    };

    const latestDetails = trackingData[0] || {};

    return (
        <div className="max-w-6xl mx-auto my-10 p-6 md:p-12 bg-white rounded-3xl shadow-sm font-sans">
            {/* Top Section */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#053B36] mb-2">
                    Track Your Consignment
                </h1>
                <p className="text-gray-400 text-sm">
                    Now you can easily track your consignment
                </p>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="mt-6 flex items-center max-w-md bg-gray-100 rounded-full p-1.5 border border-gray-200">
                    <div className="pl-4 pr-2 text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search tracking code here"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400"
                    />
                    <button
                        type="submit"
                        className="bg-[#CDE852] hover:bg-[#b8d83d] text-[#053B36] font-semibold text-xs px-8 py-2.5 rounded-full transition-colors"
                    >
                        Search
                    </button>
                </form>
            </div>

            <hr className="border-gray-100 mb-10" />

            {/* Loading & Error States */}
            {isLoading && (
                <div className="flex justify-center items-center py-16">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#053B36]"></div>
                </div>
            )}

            {isError && (
                <div className="text-center text-red-600 bg-red-50 p-4 rounded-xl border border-red-200">
                    {error.message || 'Failed to load tracking data.'}
                </div>
            )}

            {/* Content Layout */}
            {!isLoading && !isError && trackingId && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Left Panel: Product Details */}
                    <div className="bg-[#F3F5F7] p-8 rounded-3xl space-y-6">
                        <h2 className="text-2xl font-bold text-[#053B36]">Product details</h2>

                        <div className="space-y-1 text-sm text-gray-600">
                            <p className="italic text-gray-500 mb-2">
                                {formatDate(latestDetails.createdAt).date} {formatDate(latestDetails.createdAt).time}
                            </p>
                            <p><strong className="text-gray-800">Id :</strong> {latestDetails._id || 'N/A'}</p>
                            <p><strong className="text-gray-800">Invoice :</strong> {latestDetails.invoice || 'N/A'}</p>
                            <p><strong className="text-gray-800">Tracking Code :</strong> {trackingId}</p>
                        </div>

                        <div className="space-y-1 text-sm text-gray-600 pt-2 border-t border-gray-200/60">
                            <p><strong className="text-gray-800">Name :</strong> {latestDetails.recipientName || 'N/A'}</p>
                            <p><strong className="text-gray-800">Address :</strong> {latestDetails.address || 'N/A'}</p>
                            <p><strong className="text-gray-800">Phone Number :</strong> {latestDetails.phone || 'N/A'}</p>
                        </div>

                        <div className="space-y-1 text-sm text-gray-600 pt-2 border-t border-gray-200/60">
                            <p><strong className="text-gray-800">Approved :</strong> {latestDetails.approved ? 'Yes' : 'N/A'}</p>
                            <p><strong className="text-gray-800">Weight :</strong> {latestDetails.weight ? `${latestDetails.weight} KG` : 'KG'}</p>
                            <p><strong className="text-gray-800">COD :</strong> ৳ {latestDetails.codAmount || 0}</p>
                            <p className="font-semibold text-amber-500 pt-1">
                                {latestDetails.status || 'Pending'}
                            </p>
                        </div>
                    </div>

                    {/* Right Panel: Tracking Updates */}
                    <div className="bg-[#F3F5F7] p-8 rounded-3xl">
                        <h2 className="text-2xl font-bold text-[#053B36] mb-8">Tracking Updates</h2>

                        {trackingData.length === 0 ? (
                            <p className="text-gray-500 text-sm">No updates found for this consignment.</p>
                        ) : (
                            <div className="relative pl-2">
                                {trackingData.map((step, index) => {
                                    const { date, time } = formatDate(step.createdAt);
                                    const isLast = index === trackingData.length - 1;

                                    return (
                                        <div key={step._id || index} className="relative flex items-start mb-8 last:mb-0">
                                            {/* Connector Line */}
                                            {!isLast && (
                                                <span className="absolute left-[88px] top-7 bottom-[-32px] w-[2px] bg-gray-200" />
                                            )}

                                            {/* Date and Time */}
                                            <div className="w-20 text-right pr-4 text-xs font-medium text-gray-600 leading-tight">
                                                <div>{date}</div>
                                                <div className="text-gray-400 mt-0.5">{time}</div>
                                            </div>

                                            {/* Checkmark Icon Circle */}
                                            <div className="relative z-10 flex-shrink-0 w-7 h-7 rounded-full bg-[#D1FADF] flex items-center justify-center">
                                                <svg className="w-4 h-4 text-[#12B76A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>

                                            {/* Status Message */}
                                            <div className="ml-6 text-sm text-gray-700 capitalize pt-1">
                                                {step.details || step.status || 'Status update'}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                </div>
            )}
        </div>
    );
};

export default TrackingParcel;