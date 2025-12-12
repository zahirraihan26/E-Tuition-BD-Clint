import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import Socallogin from '../SocalLogin/Socallogin';
import { saveorupdateUser } from '../../../Utils';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { signInuser } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const handelLogin = (data) => {
        console.log("form data ", data)
        signInuser(data.email, data.password)
            .then(result => {
                const user = result.user;

                const userInfo = {
                    name: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                   
                };

                saveorupdateUser(userInfo)
                    .then(() => navigate(location?.state || '/'))
                    .catch(err => console.log(err));
            })
             .catch(error => {
                console.log(error);
            });
        }
        return (
            <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
                <div >
                    <div className='text-3xl font-bold text-center  pt-2'>
                        welecome back
                    </div>
                    <form className="card-body" onSubmit={handleSubmit(handelLogin)}>
                        <fieldset className="fieldset">

                            {/* Email */}
                            <label className="label">Email</label>
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                className="input"
                                placeholder="Email" />

                            {errors.email?.type === 'required' &&
                                <p className='text-red-500'>Email is required</p>
                            }

                            {/* Password */}
                            <label className="label">Password</label>
                            <input type="password" className="input"{...register('password', { required: true, minLength: 6 })} placeholder="Password" />

                            {errors.password?.type === 'minLength' &&
                                <p className='text-red-500'>Password must be 6 characters or longer</p>
                            }

                            <div>
                                <a className="link link-hover">Forgot password?</a>
                            </div>

                            <button className="btn btn-neutral mt-4">Login</button>
                        </fieldset>
                        <p className='pt-2'>new to Etuition <Link
                            state={location.state}
                            className='text-blue-500 underline' to="/register">register</Link> </p>
                    </form>
                    <Socallogin></Socallogin>
                </div>
            </div>
        );
    };

    export default Login;