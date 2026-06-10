import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';

const Register = () => {

    const {register, handleSubmit, formState :{ errors}} = useForm();

    const {registerUser, signInUser} = useAuth();

    const handleRegistration = (data) => {
            console.log(data);
            registerUser(data.email, data.password)
             .then(res => {
               return console.log(res)
             })
             .catch(error => {
                console.log(error)
             })
    }

    return (
        <div>
            <form onSubmit={handleSubmit(handleRegistration)} >
                 <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email" {...register('email', {required: true})} className="input" placeholder="Email" />
                    
                    {
                        errors.email ?. type === 'required' && <p className='text-red-600'>please give email</p>
                    }

                        {/* password  */}
                    <label className="label">Password</label>
                    <input type="password"
                     {...register('password',
                         {  required: true,
                             minLength: 6,
                             pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/

                     })
                
                } className="input" placeholder="Password" />

                    {
                        errors.password ?. type === 'required' && <p className='text-red-600'>password is requird</p>
                    }

                    {
                        errors.password?. type === 'pattern' && <p className='text-red-600'> must have upper and lower charecter </p>
                    }

                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Login</button>
                  </fieldset>
            </form>
        </div>
    );
};

export default Register;