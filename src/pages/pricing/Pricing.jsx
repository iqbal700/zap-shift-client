import React, { useState } from 'react';

const Pricing = () => {
    const [parcelType, setParcelType] = useState('');
    const [destination, setDestination] = useState('');
    const [weight, setWeight] = useState('');
    const [cost, setCost] = useState(0);

    const handleCalculate = (e) => {
        e.preventDefault();

        // Add custom pricing logic here
         const productWeight = parseFloat(weight);
         const isDocument =  parcelType === 'document';
         const isdestination = destination === 'Inside District';
         console.log(isdestination, destination, 'value of inside dis')
         let totalCost = 0;

        if(isDocument) {
            totalCost = isdestination ? 60 : 80;

        } else {

            if(productWeight < 3) {
                totalCost = isdestination ? 110 : 150;
            } else {
                const extraWeight = productWeight - 3;
                const minCharge = isdestination ? 110 : 150;
                const extraCharge = isdestination ? extraWeight * 40 : extraWeight * 40 + 40
                totalCost = minCharge + extraCharge;
                
            }
        }
              console.log('delivery charge',totalCost);
            
      
                 setCost(totalCost);
    };
     

    const handleReset = () => {
        setParcelType('');
        setDestination('');
        setWeight('');
        setCost(0);
    };

    return (
        <div className="max-w-5xl mx-auto my-10 p-8 md:p-12 bg-white rounded-3xl shadow-sm font-sans border border-gray-100">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#053B36] mb-3">
                    Pricing Calculator
                </h1>
                <p className="text-gray-500 text-sm md:text-base max-w-xl leading-relaxed">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                </p>
            </div>

            <hr className="border-gray-100 mb-10" />

            {/* Subtitle */}
            <h2 className="text-xl md:text-2xl font-bold text-[#053B36] text-center mb-10">
                Calculate Your Cost
            </h2>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Form Inputs */}
                <form onSubmit={handleCalculate} className="space-y-5 max-w-md">
                    {/* Parcel Type */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Parcel type
                        </label>
                        <select
                            value={parcelType}
                            onChange={(e) => setParcelType(e.target.value)}
                            className="w-full px-3 py-2.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#053B36] appearance-none"
                            style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%206B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1em' }}
                        >
                            <option value="" disabled hidden>Select Parcel type</option>
                            <option value="document">Document</option>
                            <option value="Non Document"> Non Document</option>
                            
                        </select>
                    </div>

                    {/* Delivery Destination */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Delivery Destination
                        </label>
                        <select
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            className="w-full px-3 py-2.5 text-sm text-gray-600 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#053B36] appearance-none"
                            style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%206B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1em' }}
                        >
                            <option value="" disabled hidden>Select Delivery Destination</option>
                            <option value="Inside District">Inside District</option>
                            <option value="Outside District">Outside District</option>
                        </select>
                    </div>

                    {/* Weight */}
                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Weight (KG)
                        </label>
                        <input
                            type="number"
                            placeholder="Contact"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            className="w-full px-3 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-[#053B36] placeholder-gray-400"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={handleReset}
                            className="px-6 py-2.5 text-xs font-semibold text-[#053B36] bg-[#F7FBEA] border border-[#D0EA70] rounded-md hover:bg-[#ebf8c7] transition-colors"
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            className="flex-1 py-2.5 text-xs font-semibold text-[#053B36] bg-[#CDE852] rounded-md hover:bg-[#b8d83d] transition-colors shadow-sm"
                        >
                            Calculate
                        </button>
                    </div>
                </form>

                {/* Result Display */}
                <div className="flex justify-center items-center py-8 md:py-0">
                    <span className="text-6xl md:text-7xl font-black text-black tracking-tight">
                        {cost} Tk
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Pricing;