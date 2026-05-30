import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Check, X, Eye, User as UserIcon, Calendar, Briefcase, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            navigate('/admin/login');
            return;
        }
        fetchUsers();
    }, [navigate]);

    const fetchUsers = async () => {
        try {
            const { data } = await api.get('/users');
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users', error);
            if (error.response?.status === 401) {
                localStorage.removeItem('userInfo');
                navigate('/admin/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleApprove = async (id) => {
        try {
            await api.put(`/users/${id}/approve`);
            setUsers(users.map(user => user._id === id ? { ...user, status: 'approved' } : user));
        } catch (error) {
            alert('Error approving user');
        }
    };

    const logout = () => {
        localStorage.removeItem('userInfo');
        navigate('/admin/login');
    };

    if (loading) return <div className="text-center mt-20 text-white">Loading users...</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                <button onClick={logout} className="bg-red-500/20 text-red-400 border border-red-500/50 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all">
                    Logout
                </button>
            </div>

            {/* Mobile View: Cards */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {users.length === 0 ? (
                    <div className="glass-card p-10 text-center text-gray-500">No registrations found</div>
                ) : (
                    users.map((user) => (
                        <div key={user._id} className="glass-card p-4 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-500/10 p-2 rounded-full">
                                        <UserIcon className="text-blue-400" size={18} />
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{user.name}</p>
                                        <p className="text-gray-500 text-xs">{user.email}</p>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                    user.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                                }`}>
                                    {user.status}
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400 flex items-center gap-2">
                                    <Briefcase size={14} /> {user.stack}
                                </span>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => setSelectedImage(`http://localhost:5000/${user.passportPhoto}`)}
                                        className="p-2 bg-slate-700 rounded text-gray-300"
                                    >
                                        <Eye size={14} />
                                    </button>
                                    <button 
                                        onClick={() => setSelectedImage(`http://localhost:5000/${user.paymentReceipt}`)}
                                        className="p-2 bg-slate-700 rounded text-gray-300"
                                    >
                                        <FileText size={14} />
                                    </button>
                                </div>
                            </div>
                            {user.status === 'pending' && (
                                <button 
                                    onClick={() => handleApprove(user._id)}
                                    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg transition-all flex items-center justify-center gap-2"
                                >
                                    <Check size={16} /> Approve User
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Desktop View: Table */}
            <div className="hidden md:block overflow-x-auto glass-card">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-slate-700 bg-slate-800/50">
                            <th className="p-4 text-gray-400 font-medium">User</th>
                            <th className="p-4 text-gray-400 font-medium">Stack</th>
                            <th className="p-4 text-gray-400 font-medium">Documents</th>
                            <th className="p-4 text-gray-400 font-medium">Status</th>
                            <th className="p-4 text-gray-400 font-medium">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-10 text-center text-gray-500">No registrations found</td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user._id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-all">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-500/10 p-2 rounded-full">
                                                <UserIcon className="text-blue-400" size={18} />
                                            </div>
                                            <div>
                                                <p className="text-white font-medium">{user.name}</p>
                                                <p className="text-gray-500 text-sm">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-300">
                                        <span className="flex items-center gap-2">
                                            <Briefcase size={14} className="text-gray-500" />
                                            {user.stack}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button 
                                                onClick={() => setSelectedImage(`http://localhost:5000/${user.passportPhoto}`)}
                                                className="flex items-center gap-1 text-xs bg-slate-700 border border-slate-600 px-2 py-1 rounded text-gray-300 hover:bg-slate-600 transition-all"
                                            >
                                                <Eye size={12} /> Passport
                                            </button>
                                            <button 
                                                onClick={() => setSelectedImage(`http://localhost:5000/${user.paymentReceipt}`)}
                                                className="flex items-center gap-1 text-xs bg-slate-700 border border-slate-600 px-2 py-1 rounded text-gray-300 hover:bg-slate-600 transition-all"
                                            >
                                                <Eye size={12} /> Receipt
                                            </button>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                            user.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                                        }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        {user.status === 'pending' && (
                                            <button 
                                                onClick={() => handleApprove(user._id)}
                                                className="bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-lg transition-all"
                                                title="Approve User"
                                            >
                                                <Check size={16} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                    <div className="relative max-w-4xl max-h-screen">
                        <button 
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-10 -right-10 text-white hover:text-gray-300"
                        >
                            <X size={32} />
                        </button>
                        <img src={selectedImage} alt="Preview" className="max-w-full max-h-[80vh] rounded-lg shadow-2xl" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
