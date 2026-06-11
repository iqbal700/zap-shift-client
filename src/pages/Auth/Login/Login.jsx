import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';

const Login = () => {

    const {register, handleSubmit} =  useForm();
    const {signInUser} = useAuth();

    const handleLogIn  = (data) => {
         console.log('data login' , data)
         signInUser(data.email, data.password)
          .then(res => {
            console.log(res)
          })
          .catch(error => {
            console.log(error)
          })
    }

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <h3 className="text-3xl-text-center">welcome back</h3>
            <form className="card-body" onSubmit={handleSubmit(handleLogIn)}>
                <fieldset className="fieldset"  >

                    {/* email section  */}
                    <label className="label">Email</label>
                    <input type="email" {...register('email')} className="input" placeholder="Email" />

                    {/* password section  */}
                    <label className="label">Password</label>
                    <input type="password" {...register('password')} className="input" placeholder="Password" />

                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                </fieldset>
                <p>New to zapshift  <Link to='/register' className='text-blue-600 font-bold' > create account</Link>  </p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Login;