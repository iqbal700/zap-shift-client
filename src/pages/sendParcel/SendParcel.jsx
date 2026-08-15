import React from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const SendParcel = () => {
    const { user } = useAuth(); //initialize default values dynamically
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { 
        register, 
        handleSubmit,
        watch, 
        formState: { errors }
    } = useForm({
        // Configured defaultValues at the initialization level to prevent blank data submission
        defaultValues: {
            parcelType: 'Document',
            senderName: user?.displayName || '',
            senderEmail: user?.email || ''
        }
    });

    const serviceCenters = useLoaderData();
    // console.log(serviceCenters)
    const senderRegion = watch('senderRegion');
    const receiverRegion = watch('receiverRegion');
    const regionsDuplicate = serviceCenters.map(c => c.region);  // Bring all the region name 

    // // there are so many region with same name, to prevent it using this logic, its not allow same name twice.
    const regions = [...new Set(regionsDuplicate)] 
        //console.log( 'not duplicate region:', regions)

    const districtsByRegion = (region) => {
          const regionDistricts = serviceCenters.filter(c => c.region === region);
          const districts = regionDistricts.map(d => d.district);
          return districts;    
    }


    const onSubmit = (data) => {
        //console.log("Parcel Booking Data:", data);
        const weight = parseFloat(data.parcelWeight)
        const isDocument = data.parcelType === 'Document';
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        let cost = 0;

        if(isDocument) {
            cost = isSameDistrict ? 60 : 80;

        } else {

            if(weight < 3) {
                cost = isSameDistrict ? 110 : 150;
            } else {
                const extraWeight = weight - 3;
                const minCharge = isSameDistrict ? 110 : 150;
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40
                cost = minCharge + extraCharge;
                
            }
        }
              console.log('delivery charge',cost);
              data.cost = cost;

            // ==-== confirmation message before finale proceed ==-== //

         Swal.fire({
            title: `Agree with the cost ${cost} ?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: " agree!"
            }).then((result) => {
            if (result.isConfirmed) {

                 axiosSecure.post('/parcels', data) 
                  .then( res => {
                   // console.log( 'after submit form data',res.data);
                    if(res.data.insertedId) {
                         navigate('/dashboard/my-parcels')
                             Swal.fire({
                                position: 'top-end',
                                title: "successfull!",
                                text: "Your products confirmed.",
                                showConfirmButton: false,
                                icon: "success",
                                timer: 2500
                                 });
                            }                   
                  })
            }});
        
    };


    return (
        <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg">
            {/* Header Section */}
            <h1 className="text-3xl font-bold text-[#0D3E36] mb-2">Send A Parcel</h1>
            <p className="text-lg font-semibold text-[#0D3E36] mb-6">Enter your parcel details</p>
            <hr className="border-gray-200 mb-6" />

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                {/* 1. Radio Buttons (Parcel Type) */}
                <div className="flex gap-6 items-center mb-6">
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-sm text-gray-700">
                        <input 
                            type="radio" 
                            value="Document" 
                            {...register('parcelType')} 
                            className="radio radio-success radio-sm" 
                        />
                        Document
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-medium text-sm text-gray-700">
                        <input 
                            type="radio" 
                            value="Not-Document" 
                            {...register('parcelType')} 
                            className="radio radio-success radio-sm" 
                        />
                        Not-Document
                    </label>
                </div>

                {/* 2. Top Fields: Parcel Name & Weight */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="label font-bold text-[#0D3E36] text-xs uppercase tracking-wide">Parcel Name</label>
                        <input 
                            type="text" 
                            placeholder="Parcel Name" 
                            className={`input input-bordered w-full bg-slate-50/50 ${errors.parcelName ? 'input-error' : ''}`}
                            {...register('parcelName', { required: "Parcel name is required" })}
                        />
                        {errors.parcelName && <span className="text-red-500 text-xs mt-1 block">{errors.parcelName.message}</span>}
                    </div>

                    <div>
                        <label className="label font-bold text-[#0D3E36] text-xs uppercase tracking-wide">Parcel Weight (KG)</label>
                        <input 
                            type="number" 
                            step="0.1"
                            placeholder="Parcel Weight (KG)" 
                            className={`input input-bordered w-full bg-slate-50/50 ${errors.parcelWeight ? 'input-error' : ''}`}
                            {...register('parcelWeight', { required: "Weight is required", min: 0.1 })}
                        />
                        {errors.parcelWeight && <span className="text-red-500 text-xs mt-1 block">{errors.parcelWeight.message}</span>}
                    </div>
                </div>

                {/* Two Column Layout: Sender vs Receiver */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-6">
                    
                    {/* === SENDER DETAILS === */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#0D3E36] mb-2 border-b pb-1">Sender Details</h3>
                        
                        <div>
                            <label className="label font-bold text-[#0D3E36] text-xs uppercase tracking-wide">Sender Name</label>
                            <input 
                                type="text" 
                                placeholder="Sender Name" 
                                className="input input-bordered w-full bg-slate-50/50"
                                {...register('senderName', { required: true })}
                            />
                        </div>
                        <div>
                            <label className="label font-bold text-[#0D3E36] text-xs uppercase tracking-wide">Sender Email</label>
                            <input 
                                type="email" 
                                placeholder="Sender Email" 
                                className="input input-bordered w-full bg-slate-50/50"
                                {...register('senderEmail', { required: true })}
                            />
                        </div>

                        <div>
                            <label className="label font-bold text-[#0D3E36] text-xs uppercase tracking-wide">Address</label>
                            <input 
                                type="text" 
                                placeholder="Address" 
                                className="input input-bordered w-full bg-slate-50/50"
                                {...register('senderAddress', { required: true })}
                            />
                        </div>

                        <div>
                            <label className="label font-bold text-[#0D3E36] text-xs uppercase tracking-wide">Sender Phone No</label>
                            <input 
                                type="tel" 
                                placeholder="Sender Phone No" 
                                className="input input-bordered w-full bg-slate-50/50"
                                {...register('senderPhone', { required: true })}
                            />
                        </div>

                        {/* ==-== sender Region ==-==  */}
                        <div>
                            <label className="label font-bold text-[#0D3E36] text-xs uppercase tracking-wide">Sender Region</label>
                            <select 
                                className="select select-bordered w-full bg-white-100 font-normal"
                                {...register('senderRegion', { required: true })}
                            >
                                <option value="">Select your Region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}> {r} </option>  )
                                }
                            </select>
                        </div>

                              {/* ==-== sender districts ==-==  */}
                        <div>
                            <label className="label font-bold text-[#0D3E36] text-xs uppercase tracking-wide">Sender District</label>
                            <select 
                                className="select select-bordered w-full bg-white-100 font-normal"
                                {...register('senderDistrict', { required: true })}
                            >
                                <option value="">Select your District</option>
                                {
                                    districtsByRegion(senderRegion).map((r, i) => <option key={i} value={r}> {r} </option>  )
                                }
                            </select>
                        </div>

                        <div>
                            <label className="label font-bold text-[#0D3E36] text-xs uppercase tracking-wide">Pickup Instruction</label>
                            <textarea 
                                placeholder="Pickup Instruction" 
                                className="textarea textarea-bordered h-28 w-full bg-slate-50/50"
                                {...register('pickupInstruction')}
                            ></textarea>
                        </div>
                    </div>

                    {/* === RECEIVER DETAILS === */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-[#0D3E36] mb-2 border-b pb-1">Receiver Details</h3>
                        
                        <div>
                            <label className="label font-bold text-[#0D3E36] text-xs uppercase tracking-wide">Receiver Name</label>
                            <input 
                                type="text" 
                                placeholder="Receiver Name" 
                                className="input input-bordered w-full bg-slate-50/50"
                                {...register('receiverName', { required: true })}
                            />
                        </div>

                        <div>
                            <label className="label font-bold text-[#0D3E36] text-xs uppercase tracking-wide">Receiver Email</label>
                            <input 
                                type="email" 
                                placeholder="Receiver Email" 
                                className="input input-bordered w-full bg-slate-50/50"
                                {...register('receiverEmail', { required: true })}
                            />
                        </div>

                        <div>
                            <label className="label font-bold text-[#0D3E36] text-xs uppercase tracking-wide">Receiver Address</label>
                            <input 
                                type="text" 
                                placeholder="Address" 
                                className="input input-bordered w-full bg-slate-50/50"
                                {...register('receiverAddress', { required: true })}
                            />
                        </div>

                        <div>
                            <label className="label font-bold text-[#0D3E36] text-xs uppercase tracking-wide">Receiver Contact No</label>
                            <input 
                                type="tel" 
                                placeholder="Receiver Contact No" 
                                className="input input-bordered w-full bg-slate-50/50"
                                {...register('receiverPhone', { required: true })}
                            />
                        </div>

                        {/* ==-== Receiver Region ==-==  */}
                        <div>
                            <label className="label font-bold text-[#0D3E36] text-xs uppercase tracking-wide">Receiver Region</label>
                            <select 
                                className="select select-bordered w-full bg-white-100 font-normal"
                                {...register('receiverRegion', { required: true })}
                            >
                                <option value="">Select your Region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}> {r} </option>  )
                                }
                            </select>
                        </div>

                              {/* ==-== Receiver districts ==-==  */}
                        <div>
                            <label className="label font-bold text-[#0D3E36] text-xs uppercase tracking-wide">Receiver District</label>
                            <select 
                                className="select select-bordered w-full bg-white-100 font-normal"
                                {...register('receiverDistrict', { required: true })}
                            >
                                <option value="">Select your District</option>
                                {
                                    districtsByRegion(receiverRegion).map((r, i) => <option key={i} value={r}> {r} </option>  )
                                }
                            </select>
                        </div>
                        <div>
                            <label className="label font-bold text-[#0D3E36] text-xs uppercase tracking-wide">Delivery Instruction</label>
                            <textarea 
                                placeholder="Delivery Instruction" 
                                className="textarea textarea-bordered h-28 w-full bg-slate-50/50"
                                {...register('deliveryInstruction')}
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/*Bottom Notice & Button*/}
                <div className="mt-6 space-y-4">
                    <p className="text-sm font-semibold text-gray-700">* PickUp Time 4pm-7pm Approx.</p>
                    <button 
                        type="submit" 
                        className="btn bg-[#C0E762] hover:bg-[#AECF54] text-[#0D3E36] font-bold border-none px-6 rounded-md shadow-sm"
                    >
                        Proceed to Confirm Booking
                    </button>
                </div>

            </form>
        </div>
    );
};

export default SendParcel;