import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                formData
            );
            localStorage.setItem('token', response.data.token);
            console.log(response.data);
            navigate("/home");
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0F19] bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-950/20 via-[#0B0F19] to-teal-900/20 flex items-center justify-center px-4 relative overflow-hidden">

            {/* Alternate ambient background glow layouts for the login view */}
            <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-full max-w-md bg-[#151D30]/50 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-8 md:p-10 relative z-10">
                <div className="text-center mb-8">
                    {/* Clean matching badge structure */}
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-400 p-[1px] mb-4">
                        <div className="w-full h-full bg-[#0B0F19] rounded-2xl flex items-center justify-center">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 font-black text-xl">✨</span>
                        </div>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-white">
                        Welcome Back
                    </h1>
                    <p className="text-slate-400 mt-2 text-sm">
                        Login to manage your tasks
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Email Address
                            </label>
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            required
                            onChange={handleChange}
                            placeholder="name@domain.com"
                            className="w-full px-4 py-3.5 bg-[#0F1524] border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-400 transition-all duration-300"
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Password
                            </label>
                            {/* Optional luxury touch: placeholder link for forgotten password */}
                            <a className="text-xs text-slate-500 hover:text-teal-400 transition-colors">
                                <Link to="/forgot-password">
                                    Forgot Password?
                                </Link>
                            </a>
                        </div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            required
                            onChange={handleChange}
                            placeholder="••••••••"
                            className="w-full px-4 py-3.5 bg-[#0F1524] border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-400 transition-all duration-300"
                        />
                    </div>

                    {/* Exclusive Matching Gradient Button */}
                    <button
                        type="submit"
                        className="w-full relative group overflow-hidden bg-gradient-to-r from-teal-400 to-emerald-400 text-[#0B0F19] font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(45,212,191,0.3)] hover:shadow-[0_4px_25px_rgba(45,212,191,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        <span className="relative z-10">Sign In</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>

                    <p className="text-center text-sm text-slate-400 mt-4">
                        Don't have an account?{" "}
                        <Link
                            to="/"
                            className="text-teal-400 font-semibold hover:text-emerald-400 transition-colors duration-200 underline underline-offset-4"
                        >
                            Register here
                        </Link>
                    </p>

                </form>
            </div>
        </div>
    );
}

export default Login