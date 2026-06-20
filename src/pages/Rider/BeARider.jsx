import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import riderImg from '../../assets/agent-pending.png'

const BeARider = () => {
    // React Hook Form initialization
    const { register, handleSubmit,  watch, formState: { errors }, reset } = useForm();
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();

// ==-==  Creating code for auto selectiong district and division ==-= //
    const serviceCenters = useLoaderData();
    const riderRegion = watch('riderRegion');
    const regionsDuplicate = serviceCenters.map(c => c.region);

    const districtsByRegion = (region) => {
          const regionDistricts = serviceCenters.filter(c => c.region === region);
          const districts = regionDistricts.map(d => d.district);
          return districts;
         
    }

        // speciality of new Set() is its not allow double namings 
    const regions = [...new Set(regionsDuplicate)]


    // Form submission handler
    const handleRider = (data) => {
        console.log('Rider Registration Data:', data);
        axiosSecure.post('/riders', data)
            .then( res => {

                console.log(res.data)
                if(res.data.insertedId) {
                // reset();
                     Swal.fire({
                            position: 'top-end',
                            title: "successfull!",
                            text: "Your application has been submitted.",
                            showConfirmButton: false,
                            icon: "success",
                            timer: 2000
                                });
                        }
                }
            )

       
    };

    return (
        <div className="max-w-6xl mx-auto p-6 min-h-screen bg-white">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-extrabold text-[#063535] mb-2">Be a Rider</h1>
                <p className="text-gray-500 max-w-2xl text-sm leading-relaxed">
                    Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. 
                    From personal packages to business shipments — we deliver on time, every time.
                </p>
            </div>

            <hr className="border-gray-100 mb-8" />

            {/* Main Grid Layout: Form on the left (7 cols), Image on the right (5 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Form Input Section */}
                <div className="lg:col-span-7">
                    <h2 className="text-xl font-bold text-[#063535] mb-6">Tell us about yourself</h2>
                    
                    <form onSubmit={handleSubmit(handleRider)} className="space-y-4">
                        
                        {/* Your Name */}
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">Your Name</label>
                            <input 
                                type="text" 
                                placeholder="Your Name"
                                {...register("name", { required: "Name is required" })}
                                className="input input-bordered w-full text-sm bg-white border-gray-300 focus:outline-none focus:border-[#063535]" 
                            />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>

                        {/* Driving License Number */}
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">Driving License Number</label>
                            <input 
                                type="text" 
                                placeholder="Driving License Number"
                                {...register("licenseNumber", { required: "Driving License is required" })}
                                className="input input-bordered w-full text-sm bg-white border-gray-300 focus:outline-none focus:border-[#063535]" 
                            />
                            {errors.licenseNumber && <p className="text-red-500 text-xs mt-1">{errors.licenseNumber.message}</p>}
                        </div>

                        {/* Your Email */}
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">Your Email</label>
                            <input 
                                type="email" 
                                placeholder="Your Email"
                                 defaultValue={user?.email}
                                 readOnly
                                {...register("email", { required: "Email is required" })}
                                className="input input-bordered w-full text-sm bg-white border-gray-300 focus:outline-none focus:border-[#063535]" 
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Two-column layout for Region and District */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                             {/* ==-== sender Region ==-==  */}
                        <div>
                            <label className="label font-bold text-[#0D3E36] text-xs uppercase tracking-wide"> Your Region</label>
                            <select 
                                className="select select-bordered w-full bg-white-100 font-normal"
                                {...register('riderRegion', { required: true })}
                            >
                                <option value="">Select your Region</option>
                                {
                                    regions.map((r, i) => <option key={i} value={r}> {r} </option>  )
                                }
                            </select>
                        </div>

                              {/* ==-== Rider districts ==-==  */}
                        <div>
                            <label className="label font-bold text-[#0D3E36] text-xs uppercase tracking-wide"> Your District</label>
                            <select 
                                className="select select-bordered w-full bg-white-100 font-normal"
                                {...register('riderDistrict', { required: true })}
                            >
                                <option value="">Select your District</option>
                                {
                                    districtsByRegion(riderRegion).map((r, i) => <option key={i} value={r}> {r} </option>  )
                                }
                            </select>
                        </div>
                        </div>

                        {/* NID No */}
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">NID No</label>
                            <input 
                                type="text" 
                                placeholder="NID"
                                {...register("nid", { required: "NID number is required" })}
                                className="input input-bordered w-full text-sm bg-white border-gray-300 focus:outline-none focus:border-[#063535]" 
                            />
                            {errors.nid && <p className="text-red-500 text-xs mt-1">{errors.nid.message}</p>}
                        </div>

                        {/* Phone Number */}
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">Phone Number</label>
                            <input 
                                type="tel" 
                                placeholder="Phone Number"
                                {...register("phone", { required: "Phone number is required" })}
                                className="input input-bordered w-full text-sm bg-white border-gray-300 focus:outline-none focus:border-[#063535]" 
                            />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                        </div>

                        {/* Bike Brand Model and Year */}
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">Bike Brand Model and Year</label>
                            <input 
                                type="text" 
                                placeholder="Bike Brand Model and Year"
                                {...register("bikeModel", { required: "Bike details are required" })}
                                className="input input-bordered w-full text-sm bg-white border-gray-300 focus:outline-none focus:border-[#063535]" 
                            />
                            {errors.bikeModel && <p className="text-red-500 text-xs mt-1">{errors.bikeModel.message}</p>}
                        </div>

                        {/* Bike Registration Number */}
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">Bike Registration Number</label>
                            <input 
                                type="text" 
                                placeholder="Bike Registration Number"
                                {...register("bikeRegNo", { required: "Bike registration number is required" })}
                                className="input input-bordered w-full text-sm bg-white border-gray-300 focus:outline-none focus:border-[#063535]" 
                            />
                            {errors.bikeRegNo && <p className="text-red-500 text-xs mt-1">{errors.bikeRegNo.message}</p>}
                        </div>

                        {/* Tell Us About Yourself */}
                        <div>
                            <label className="block text-xs font-bold text-gray-700 mb-1.5">Tell Us About Yourself</label>
                            <textarea 
                                placeholder="Tell Us About Yourself"
                                {...register("aboutYourself")}
                                className="textarea textarea-bordered w-full text-sm bg-white border-gray-300 h-24 focus:outline-none focus:border-[#063535]"
                            ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button 
                                type="submit" 
                                className="w-full bg-[#CCE96A] hover:bg-[#bada55] text-[#063535] font-bold py-3 px-4 rounded-lg transition-colors border-none"
                            >
                                Apply as a Rider
                            </button>
                        </div>

                    </form>
                </div>

                {/* Right Sticky Column for Illustration */}
                <div className="lg:col-span-5 flex justify-center items-center lg:sticky lg:top-6">
                    <img 
                        src={riderImg} 
                        alt="Rider Illustration" 
                        className="w-full max-w-md object-contain"
                    />
                </div>

            </div>
        </div>
    );
};

export default BeARider;