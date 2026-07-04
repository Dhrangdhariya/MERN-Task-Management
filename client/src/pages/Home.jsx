import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Home = () => {
    const [showTaskCreate, setShowTaskCreate] = useState(false);
    const [task, setTask] = useState([]);
    const [taskData, setTaskData] = useState({ title: '', desc: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            Navigate('/login');
        } else {
            fetchData();
        }
    }, []);

    const fetchData = async () => {
        try {
            const taskRes = await axios.get(
                "http://localhost:5000/api/auth/home",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setTask(taskRes.data);
        } catch (error) {
            console.log(error.message);
        }
    };

    const handelCreateTask = async (e) => {
        e.preventDefault();

        try {

            if (isEditing) {

                await axios.put(
                    `http://localhost:5000/api/auth/home/${editingId}`,
                    taskData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

            } else {

                await axios.post(
                    "http://localhost:5000/api/auth/home",
                    taskData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            }

            setShowTaskCreate(false);
            setTaskData({ title: '', desc: '' });
            setEditingId(null);
            setIsEditing(false);

            fetchData();

        } catch (error) {
            alert(error.response?.data?.message || 'Something went wrong');
        }
    };

    const updateTask = (task) => {
        setTaskData({
            title: task.title,
            desc: task.desc
        });

        setEditingId(task._id);
        setIsEditing(true);
        setShowTaskCreate(true);
    }

    const deleteTask = async (id) => {
        try {
            await axios.delete(
                `http://localhost:5000/api/auth/home/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            fetchData();

        } catch (error) {
            alert(error.response?.data?.message || 'Error deleting task');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[#0B0F19] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-950/20 via-[#0B0F19] to-[#090D16] p-4 sm:p-8 antialiased font-sans relative overflow-hidden">

            {/* Background Ambient Glow Elements */}
            <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div className="max-w-4xl mx-auto space-y-8 relative z-10">

                {/* Premium Cosmic Glassmorphism Header */}
                <header className="relative overflow-hidden rounded-3xl bg-[#151D30]/40 backdrop-blur-xl border border-slate-800/80 p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-2xl">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl flex items-center gap-2">
                            Workspace <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">⚡</span>
                        </h1>
                        <p className="text-sm font-medium text-slate-400 mt-1">
                            Manage your workflow and daily operations smoothly.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <button
                            onClick={() => setShowTaskCreate(!showTaskCreate)}
                            className={`flex-1 sm:flex-none inline-flex items-center justify-center px-5 py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 transform active:scale-95 ${showTaskCreate
                                    ? "bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20"
                                    : "bg-gradient-to-r from-teal-400 to-emerald-400 text-[#0B0F19] shadow-[0_4px_15px_rgba(45,212,191,0.2)] hover:shadow-[0_4px_20px_rgba(45,212,191,0.4)]"
                                }`}
                        >
                            {showTaskCreate ? (
                                <span>Close Form</span>
                            ) : (
                                <span className="flex items-center gap-1.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    New Task
                                </span>
                            )}
                        </button>

                        <button
                            onClick={handleLogout}
                            className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-sm border border-slate-700/60 transition-all duration-200"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                {/* Create Task Form (Dynamic Drawdown) */}
                {showTaskCreate && (
                    <div className="bg-[#151D30]/60 backdrop-blur-xl rounded-3xl border border-slate-800/80 shadow-2xl p-6 sm:p-8 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-teal-500/10 rounded-xl text-teal-400 border border-teal-500/20">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-white">
                                {isEditing ? 'Modify Selected Task' : 'Draft a New Task'}
                            </h2>
                        </div>

                        <form onSubmit={handelCreateTask} className="space-y-5">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                    Task Title
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g., Update Landing Page Assets"
                                    value={taskData.title}
                                    onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                                    className="w-full bg-[#0F1524] border border-slate-800 rounded-xl p-3.5 text-slate-200 placeholder-slate-600 outline-none transition-all duration-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                                    Task Description
                                </label>
                                <textarea
                                    rows="4"
                                    placeholder="Provide detailed action items or context..."
                                    value={taskData.desc}
                                    onChange={(e) => setTaskData({ ...taskData, desc: e.target.value })}
                                    className="w-full bg-[#0F1524] border border-slate-800 rounded-xl p-3.5 text-slate-200 placeholder-slate-600 outline-none transition-all duration-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-500/20 resize-none"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-teal-400 to-emerald-400 text-[#0B0F19] py-4 rounded-xl font-bold text-sm tracking-wide shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                            >
                                {isEditing ? 'Save Changes' : 'Publish New Task'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Tasks Section Area */}
                <div>
                    <div className="flex items-center justify-between mb-6 px-1">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold text-white">
                                Active Tasks
                            </h2>
                            <span className="bg-teal-500/10 text-teal-400 px-2.5 py-0.5 rounded-full text-xs font-bold border border-teal-500/20">
                                {task.length}
                            </span>
                        </div>
                    </div>

                    {task.length === 0 ? (
                        /* Minimal Empty State Display Layout */
                        <div className="text-center py-16 bg-[#151D30]/30 rounded-3xl border border-dashed border-slate-800 p-8">
                            <div className="inline-flex p-4 bg-slate-900 text-slate-600 rounded-2xl mb-4 border border-slate-800">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-.621-.504-1.125-1.125-1.125H9.75M10.5 4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V6.75a4.5 4.5 0 01-4.5 4.5h-1.5a4.5 4.5 0 01-4.5-4.5v-1.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V6.75A2.25 2.25 0 0010.5 9h1.5a2.25 2.25 0 002.25-2.25V4.875z" />
                                </svg>
                            </div>
                            <h3 className="text-md font-bold text-slate-300">No tasks on your plate</h3>
                            <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto">
                                Everything looks clear! Click the "New Task" button to schedule your next milestone.
                            </p>
                        </div>
                    ) : (
                        /* Interactive Clean Vertical Cards Array List */
                        <div className="space-y-4">
                            {task.map((tk) => (
                                <div
                                    key={tk._id}
                                    className="group relative bg-[#151D30]/40 border border-slate-800/80 rounded-3xl p-6 sm:p-7 shadow-xl hover:bg-[#151D30]/70 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
                                >
                                    {/* Left indicator stripe glowing accent on row frame hover */}
                                    <div className="absolute left-0 top-0 bottom-0 w-[0px] group-hover:w-[4px] bg-gradient-to-b from-teal-400 to-emerald-400 rounded-l-3xl transition-all duration-200" />

                                    <div className="flex-1 min-w-0 md:pl-2">
                                        <h3 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight group-hover:text-teal-400 transition-colors duration-200">
                                            {tk.title}
                                        </h3>
                                        <p className="text-slate-400 text-base mt-2 leading-relaxed font-normal">
                                            {tk.desc}
                                        </p>
                                    </div>

                                    {/* Actions & Status Controllers layout grouping row */}
                                    <div className="flex flex-wrap items-center gap-3 shrink-0 pt-4 md:pt-0 border-t border-slate-800/60 md:border-none">
                                        {/* Active Status Badge Pill */}
                                        <span className="inline-flex items-center gap-1.5 font-semibold bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-slate-400">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                            Active
                                        </span>

                                        {/* Update Trigger Action */}
                                        <button
                                            onClick={() => updateTask(tk)}
                                            className="inline-flex items-center justify-center font-bold bg-slate-800/60 hover:bg-teal-500/10 border border-slate-700/50 hover:border-teal-500/30 px-4 py-2 rounded-xl text-xs text-slate-300 hover:text-teal-400 transition-all duration-200"
                                        >
                                            Update
                                        </button>

                                        {/* Delete Trigger Action */}
                                        <button
                                            onClick={() => deleteTask(tk._id)}
                                            className="inline-flex items-center justify-center font-bold bg-slate-800/60 hover:bg-rose-500/10 border border-slate-700/50 hover:border-rose-500/30 px-4 py-2 rounded-xl text-xs text-slate-300 hover:text-rose-400 transition-all duration-200"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;