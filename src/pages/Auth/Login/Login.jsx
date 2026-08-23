import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {
    const { register, handleSubmit } = useForm();
    const { signInUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogIn = (data) => {
        signInUser(data.email, data.password)
            .then((res) => {
                console.log(res);
                navigate(location?.state || '/');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 md:p-8 font-sans">
            {/* Form Card Container */}
            <div className="w-full max-w-md p-8 sm:p-10 bg-white/90 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-center">
                
                {/* Title Section */}
                <div className="text-left mb-6">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#053B36] mb-1">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Login with ZapShift
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit(handleLogIn)} className="w-full space-y-4">
                    {/* Email Field */}
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
                    </div>

                    {/* Password Field */}
                    <div className="w-full">
                        <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                            Password
                        </label>
                        <input
                            type="password"
                            {...register('password', { required: true })}
                            placeholder="Password"
                            className="w-full px-3.5 py-2.5 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:border-[#053B36] placeholder-gray-300 transition-colors"
                        />
                    </div>

                    {/* Forgot Password Link */}
                    <div>
                        <a href="#" className="text-xs text-gray-400 underline hover:text-gray-600 transition-colors">
                            Forget Password?
                        </a>
                    </div>

                    {/* Login Button with subtle shadow */}
                    <button
                        type="submit"
                        className="w-full cursor-pointer py-2.5 text-sm font-semibold text-[#053B36] bg-[#CDE852] rounded-lg hover:bg-[#b8d83d] transition-all shadow-sm active:scale-[0.99]"
                    >
                        Login
                    </button>

                    {/* Register Link */}
                    <p className="text-xs text-gray-500 text-left pt-1">
                        Don't have any account?{' '}
                        <Link to="/register" className="text-[#8FB339] font-medium hover:underline">
                            Register
                        </Link>
                    </p>
                </form>

                {/* Divider */}
                <div className="relative flex items-center justify-center my-5">
                    <span className="text-xs text-gray-400 bg-white px-2 z-10">Or</span>
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-100"></div>
                    </div>
                </div>

                {/* Google / Social Login Section */}
                <div className="w-full">
                    <SocialLogin />
                </div>

            </div>
        </div>
    );
};

export default Login;