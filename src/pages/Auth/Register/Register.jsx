import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { registerUser, updateUserProfile } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const handleRegistration = (data) => {
        console.log('handle register data:', data);

        const profileImg = data.photo[0];

        registerUser(data.email, data.password)
            .then((res) => {
                console.log(res.user);

                // 1. Store image in FormData
                const formData = new FormData();
                formData.append('image', profileImg);

                // 2. Upload image to ImgBB
                const img_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_host_key}`;

                axios
                    .post(img_API_URL, formData)
                    .then((res) => {
                        const photoURL = res.data.data.display_url;

                        // User information
                        const userInfo = {
                            displayName: data.name,
                            email: data.email,
                            photoURL: photoURL,
                        };

                        console.log('userInfo:', userInfo);

                        // Send user information to database
                        axiosSecure
                            .post('/users', userInfo)
                            .then((res) => {
                                if (res.data.insertedId) {
                                    console.log(
                                        'user created in the database'
                                    );
                                }
                            });

                        // 3. Update Firebase user profile
                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL,
                        };

                        updateUserProfile(userProfile)
                            .then((res) =>
                                console.log(
                                    'user profile updated done',
                                    res.data
                                )
                            )
                            .catch((err) => console.log(err));

                        // Navigate after successful registration
                        navigate('/');
                    })
                    .catch((err) => console.log(err));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="w-full flex justify-center px-2 sm:px-0 py-4 sm:py-6">
            <div className="w-full max-w-md p-6 sm:p-8 md:p-10 bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">

                {/* Title Section */}
                <div className="text-left mb-6">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#053B36] mb-1">
                        Create Account
                    </h1>

                    <p className="text-gray-500 text-sm">
                        Register with ZapShift
                    </p>
                </div>

                {/* Registration Form */}
                <form
                    onSubmit={handleSubmit(handleRegistration)}
                    className="w-full space-y-4"
                >
                    {/* Name */}
                    <div className="w-full">
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Name
                        </label>

                        <input
                            type="text"
                            {...register('name', { required: true })}
                            placeholder="Your name"
                            className="w-full px-3.5 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#053B36] placeholder-gray-300 transition-colors"
                        />

                        {errors.name?.type === 'required' && (
                            <p className="text-red-500 text-xs mt-1">
                                Name is required
                            </p>
                        )}
                    </div>

                    {/* Photo */}
                    <div className="w-full">
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Profile Photo
                        </label>

                        <input
                            type="file"
                            accept="image/*"
                            {...register('photo', { required: true })}
                            className="w-full px-3 py-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg file:mr-3 file:px-3 file:py-1.5 file:border-0 file:rounded-md file:bg-[#CDE852] file:text-[#053B36] file:text-xs file:font-semibold hover:file:bg-[#b8d83d] cursor-pointer transition-colors"
                        />

                        {errors.photo?.type === 'required' && (
                            <p className="text-red-500 text-xs mt-1">
                                Photo is required
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="w-full">
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Email
                        </label>

                        <input
                            type="email"
                            {...register('email', { required: true })}
                            placeholder="Email"
                            className="w-full px-3.5 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#053B36] placeholder-gray-300 transition-colors"
                        />

                        {errors.email?.type === 'required' && (
                            <p className="text-red-500 text-xs mt-1">
                                Please provide your email
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div className="w-full">
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Password
                        </label>

                        <input
                            type="password"
                            {...register('password', {
                                required: true,
                                minLength: 6,
                                pattern:
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                            })}
                            placeholder="Password"
                            className="w-full px-3.5 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#053B36] placeholder-gray-300 transition-colors"
                        />

                        {errors.password?.type === 'required' && (
                            <p className="text-red-500 text-xs mt-1">
                                Password is required
                            </p>
                        )}

                        {errors.password?.type === 'minLength' && (
                            <p className="text-red-500 text-xs mt-1">
                                Password must be at least 6 characters
                            </p>
                        )}

                        {errors.password?.type === 'pattern' && (
                            <p className="text-red-500 text-xs mt-1">
                                Must have uppercase, lowercase and a number
                            </p>
                        )}
                    </div>

                    {/* Forgot Password */}
                    <div>
                        <a
                            href="#"
                            className="text-xs text-gray-400 underline hover:text-gray-600 transition-colors"
                        >
                            Forget Password?
                        </a>
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer py-2.5 text-sm font-semibold text-[#053B36] bg-[#CDE852] rounded-lg hover:bg-[#b8d83d] transition-all shadow-sm active:scale-[0.99]"
                    >
                        Register
                    </button>

                    {/* Login Link */}
                    <p className="text-xs text-gray-500 text-left pt-1">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="text-[#8FB339] font-medium hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </form>

                {/* Divider */}
                <div className="relative flex items-center justify-center my-5">
                    <span className="text-xs text-gray-400 bg-white px-2 z-10">
                        Or
                    </span>

                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-100"></div>
                    </div>
                </div>

                {/* Social Login */}
                <div className="w-full">
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Register;