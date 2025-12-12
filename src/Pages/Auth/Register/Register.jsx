import React from 'react';
import { User, Mail, Lock, Eye } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import Socallogin from '../SocalLogin/Socallogin';
import axios from 'axios';
import { saveorupdateUser } from '../../../Utils';

const Register = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { registerUser, updateUserProfile } = useAuth()

  const location = useLocation()
  const navgate = useNavigate()

  const handelregistation = (data) => {
    console.log("after register", data.photo[0])

    const profileImg = data.photo[0]
    console.log("Form Data:", data);
    registerUser(data.email, data.password)

      .then(result => {
        console.log(result.user)
        // 1. Upload image to imgBB
        const formData = new FormData();
        formData.append('image', profileImg)
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Imghost}`
        axios.post(image_API_URL, formData)
          .then(res => {
            console.log("after img upload", res.data.data.url)
            //update user photo
            const userProfile = {
              displayName: data.name,
              photoURL: res.data.data.url
            }
            // 2. Update Firebase profile
            updateUserProfile(userProfile)
              .then(() => {

                // 3. Save user to database
                const userInfo = {
                  name: data.name,
                  email: data.email,
                  photoURL: res.data.data.url,
                  
                };

                saveorupdateUser(userInfo)
                  .then(() => {
                    console.log("User Saved in DB");
                    navgate(location.state || "/");
                  })
                  .catch(err => console.log(err));
              })
              .catch(error => console.log(error));
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
        <h3 className='text-3xl font-bold text-center  pt-2'>
          welecome E Tuition
        </h3>
        <p className='text-center'>Please Register</p>
        <form className="card-body" onSubmit={handleSubmit(handelregistation)}>
          <fieldset className="fieldset">

            {/* Name*/}
            <label className="label">Name</label>
            <input
              type="text"
              {...register('name', { required: true })}
              className="input" placeholder="Your Name" />
            {errors.name?.type === 'required' && <p
              className='text-red-500'>Name is required</p>}

            {/* Photo*/}
            <label className="label">Photo</label>
            <input type="file" {...register('photo', {
              required:
                true
            })} className="file-input" placeholder="Your photo" />
            {errors.name?.type === 'required' && <p
              className='text-red-500'>Photo is required</p>}


            {/* Email */}
            <label className="label">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="input"
              placeholder="Email"
            />
            {errors.email?.type === 'required' &&
              <p className='text-red-500'>Email is required</p>
            }

            {/* Password */}
            <label className="label">Password</label>
            <input
              type="password"
              className="input"
              {...register('password', {
                required: true,
                minLength: 6,
                // pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&^#()\-_=+{}[\]|;:'",.<>\/?]).{6,}$/
              })}
              placeholder="Password"
            />

            {errors.password?.type === 'required' &&
              <p className='text-red-500'>Password is required</p>
            }

            {errors.password?.type === 'minLength' &&
              <p className='text-red-500'>Password must be 6 characters or longer</p>
            }
            {/* {
                        errors.password?.type === 'pattern' && <p className='text-red-500'> password must have 1 upper case 1 lower case 1 number and one spasal char </p>
                    } */}
            {/* Email */}
            <label className="label">phn Number</label>
            <input
              type="number"
              {...register('number', { required: true })}
              className="input"
              placeholder="phn"
            />

            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button className="btn btn-neutral mt-4">Register</button>
          </fieldset>
          <p className='pt-2'>Alrady have an account<Link
            state={location.state}
            className='text-blue-500 underline' to="/login">login</Link> </p>
        </form>
        <Socallogin></Socallogin>
      </div>
    </div>
  );
};

export default Register;
