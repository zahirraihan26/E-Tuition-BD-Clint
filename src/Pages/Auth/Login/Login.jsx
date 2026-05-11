import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import Socallogin from '../SocalLogin/Socallogin';
import { saveorupdateUser } from '../../../Utils';
import { Mail, Lock, Eye, EyeOff, Sparkles, ShieldCheck, Star, BookOpen, GraduationCap } from 'lucide-react';

const Login = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { signInuser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handelLogin = (data) => {
        console.log("form data ", data);
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

    const handleDemoLogin = (email, password) => {
        setValue('email', email);
        setValue('password', password);
        handleSubmit(handelLogin)();
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 p-4 lg:p-8 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px]"></div>
            </div>

            <div className="max-w-[1300px] w-full flex flex-col lg:flex-row gap-12 lg:gap-20 relative z-10 items-center justify-between">
            {/* Left Content Section */}
            <div className="flex-1 w-full lg:w-auto pt-8 lg:pt-0">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-100/50 border border-base-300 text-sm font-medium mb-8 backdrop-blur-sm shadow-sm text-base-content/80">
                        <Sparkles className="w-4 h-4 text-primary" />
                        <span>Trusted by 10,000+ learners</span>
                    </div>
                    
                    <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-base-content leading-[1.1]">
                        Unlock your <br/>
                        <span className="text-primary">learning potential</span>
                    </h1>
                    
                    <p className="text-lg text-base-content/70 mb-12 max-w-lg leading-relaxed">
                        Join a premium community of students and expert tutors building the future of personalized education.
                    </p>
                    
                    <div className="space-y-4 max-w-lg">
                        <div className="flex items-center gap-5 p-4 rounded-2xl bg-base-100/50 border border-base-300 backdrop-blur-sm shadow-sm hover:border-primary/30 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                                <ShieldCheck className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-base-content">Verified Tutors</h4>
                                <p className="text-base-content/60 text-sm">Hand-picked, background checked</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-5 p-4 rounded-2xl bg-base-100/50 border border-base-300 backdrop-blur-sm shadow-sm hover:border-primary/30 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                                <Star className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-base-content">Top-rated Sessions</h4>
                                <p className="text-base-content/60 text-sm">4.9/5 average satisfaction</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-5 p-4 rounded-2xl bg-base-100/50 border border-base-300 backdrop-blur-sm shadow-sm hover:border-primary/30 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
                                <BookOpen className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold text-base-content">Any Subject, Any Level</h4>
                                <p className="text-base-content/60 text-sm">From school to professional</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Form Card Section */}
            <div className="w-full max-w-[500px] bg-base-100 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl border border-base-200 max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-base-300 [&::-webkit-scrollbar-thumb]:rounded-full">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/20 shrink-0">
                        <GraduationCap className="w-7 h-7 text-primary" />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-center text-base-content mb-2 tracking-tight">Welcome Back</h2>
                    <p className="text-center text-base-content/60 mb-8 text-sm">Sign in to continue your journey</p>
                    
                    {/* Toggle */}
                    <div className="flex bg-base-200 rounded-xl p-1 mb-8 border border-base-300/50">
                        <Link to="/login" className="flex-1 text-center py-2.5 rounded-lg bg-base-100 shadow-sm text-sm font-bold text-base-content">Login</Link>
                        <Link to="/register" className="flex-1 text-center py-2.5 rounded-lg text-sm font-semibold text-base-content/60 hover:text-base-content transition-colors">Register</Link>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit(handelLogin)}>
                        <div>
                            <label className="block text-xs font-bold tracking-wider text-base-content/60 uppercase mb-2">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-base-content/40" />
                                </div>
                                <input
                                    type="email"
                                    {...register('email', { required: true })}
                                    className="block w-full pl-11 pr-4 py-3.5 bg-base-200/50 border border-base-300 rounded-2xl text-base-content focus:bg-base-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm outline-none placeholder:text-base-content/30"
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email?.type === 'required' && <p className='mt-1.5 text-xs text-red-500 font-semibold pl-1'>Email is required</p>}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-xs font-bold tracking-wider text-base-content/60 uppercase">Password</label>
                                <a href="#" className="text-xs font-bold text-primary hover:text-primary/80 transition-colors">Forgot?</a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-base-content/40" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    {...register('password', { required: true, minLength: 6 })}
                                    className="block w-full pl-11 pr-12 py-3.5 bg-base-200/50 border border-base-300 rounded-2xl text-base-content focus:bg-base-100 focus:ring-2 focus:ring-primary focus:border-transparent transition-all sm:text-sm outline-none placeholder:text-base-content/30"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-base-content/40 hover:text-base-content transition-colors"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.password?.type === 'minLength' && <p className='mt-1.5 text-xs text-red-500 font-semibold pl-1'>Min 6 characters</p>}
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-2 flex justify-center py-3.5 px-4 rounded-2xl shadow-lg shadow-primary/30 text-sm font-bold bg-primary text-primary-content hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all transform active:scale-[0.98]"
                        >
                            Sign In
                        </button>

                        <div className="grid grid-cols-2 gap-4 mt-4">
                            <button
                                type="button"
                                onClick={() => handleDemoLogin('admin@gmail.com', '123456')}
                                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-primary/20 bg-primary/5 text-primary text-xs font-bold hover:bg-primary/10 transition-colors"
                            >
                                <ShieldCheck className="w-4 h-4" />
                                Demo Admin
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDemoLogin('tegeruqeg@mailinator.com', 'Pa$$w0rd!')}
                                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-secondary/20 bg-secondary/5 text-secondary text-xs font-bold hover:bg-secondary/10 transition-colors"
                            >
                                <GraduationCap className="w-4 h-4" />
                                Demo Tutor
                            </button>
                        </div>
                    </form>

                    <div className="mt-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-base-300" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-4 bg-base-100 text-base-content/50 font-medium">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            {/* The Social Login Button */}
                            <Socallogin />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;