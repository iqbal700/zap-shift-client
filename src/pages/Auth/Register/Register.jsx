import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router';
import SocialLogin from '../SocialLogin/SocialLogin';
import axios from 'axios';

const Register = () => {

    const {register, handleSubmit, formState :{ errors}} = useForm();

    const {registerUser, updateUserProfile} = useAuth();

    const handleRegistration = (data) => {

        console.log(data)

        const profileImg = data.photo[0];
         
            registerUser(data.email, data.password)
             .then(res => {
                console.log(res.user)
                // 1 store the image formData
                const formData  = new FormData();
                formData.append('image', profileImg)
               
              
                // 2 upload image to imgBB using axios
                 const img_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_host_key}`
                    axios.post(img_API_URL, formData)
                     .then(res => {
                        console.log('after img upload',res.data.data.display_url)

                        // 3 =-= update user profile =-=
                        const userProfile = {
                            displayName :  data.name,
                            photoUrl : res.data.data.display_url
                        }

                          updateUserProfile(userProfile)
                            .then(res => console.log('user profile updated done'))
                            .catch(err => console.log(err))
                    })

                     .catch(err => console.log(err));
             })
             .catch(error => {
                console.log(error)
             })
    }

    return (
        <div>
            <form className='card-body' onSubmit={handleSubmit(handleRegistration)} >
                 <fieldset className="fieldset">


                    {/* ==-== Name field ==-==  */}
                    <label className="label">Name</label>
                    <input type="text" {...register('name', {required: true})} className="input" placeholder="your name" />
                    
                    {
                        errors.name ?. type === 'required' && <p className='text-red-600'>Name is required</p>
                    }

                    {/* ==-== Photo field ==-==  */}
                    <label className="label">chose photo</label>
                    <input type="file" {...register('photo', {required: true})} className="file-input" placeholder="chose your file" />
                    
                    {
                        errors.photo ?. type === 'required' && <p className='text-red-600'>photo is required</p>
                    }

                    {/* ==-== Email field ==-==  */}

                    <label className="label">Email</label>
                    <input type="email" {...register('email', {required: true})} className="input" placeholder="Email" />
                    
                    {
                        errors.email ?. type === 'required' && <p className='text-red-600'>please give email</p>
                    }

                        {/* ==-== password field ==-== */}
                    <label className="label">Password</label>
                    <input
                        type="password"
                        className="input"
                        placeholder="Password"
                     {...register('password',
                         {  required: true,
                             minLength: 6,
                             pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/

                       })}
                
                  />

                    {
                        errors.password ?. type === 'required' && <p className='text-red-600'>password is requird</p>
                    }

                    {
                        errors.password?. type === 'pattern' && <p className='text-red-600'> must have upper and lower charecter </p>
                    }

                    <div><a className="link link-hover">Forgot password?</a></div>
                    <button className="btn btn-neutral mt-4">Register</button>
                  </fieldset>
                   <p> already have an account  <Link to='/login' className='text-blue-600 font-bold' > login </Link>  </p>
            </form>
            <SocialLogin></SocialLogin>
        </div>
    );
};

export default Register;



        