import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {

    const { token } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            return alert('Passwords do not match');
        }

        try {

            const response = await axios.put(
                `http://localhost:5000/api/auth/reset-password/${token}`,
                {
                    password: formData.password
                }
            );

            alert(response.data.message);
            navigate('/login');

        } catch (error) {
            alert(
                error.response?.data?.message ||
                'Something went wrong'
            );
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0F19] bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-950/20 via-[#0B0F19] to-teal-900/10 flex items-center justify-center px-4 relative overflow-hidden">

            {/* Dynamic ambient background glow shapes */}
            <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-full max-w-md bg-[#151D30]/50 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-8 md:p-10 relative z-10">

                <div className="text-center mb-8">
                    {/* Shield / Security icon placeholder badge */}
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-400 p-[1px] mb-4">
                        <div className="w-full h-full bg-[#0B0F19] rounded-2xl flex items-center justify-center">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400 font-black text-xl">🛡️</span>
                        </div>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-white">
                        Reset Password
                    </h1>
                    <p className="text-slate-400 mt-2 text-sm">
                        Enter your new password below to secure your workspace account
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3.5 bg-[#0F1524] border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-400 transition-all duration-300"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3.5 bg-[#0F1524] border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-400 transition-all duration-300"
                        />
                    </div>

                    {/* Exclusive Lifting Gradient Button */}
                    <button
                        type="submit"
                        className="w-full relative group overflow-hidden bg-gradient-to-r from-teal-400 to-emerald-400 text-[#0B0F19] font-bold py-4 rounded-xl shadow-[0_4px_20px_rgba(45,212,191,0.3)] hover:shadow-[0_4px_25px_rgba(45,212,191,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                        <span className="relative z-10">Update Password</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>

                </form>

            </div>
        </div>
    );
};

export default ResetPassword;