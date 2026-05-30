// import React, { useState } from 'react';
// import api from '../services/api';
// import { Upload, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

// const RegistrationForm = ({ onSuccess }) => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         stack: ''
//     });
//     const [passportPhoto, setPassportPhoto] = useState(null);
//     const [paymentReceipt, setPaymentReceipt] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState('');

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');

//         if (!paymentReceipt) {
//             setError('Payment receipt is mandatory for registration.');
//             return;
//         }

//         setLoading(true);
//         const data = new FormData();
//         data.append('name', formData.name);
//         data.append('email', formData.email);
//         data.append('stack', formData.stack);
//         data.append('passportPhoto', passportPhoto);
//         data.append('paymentReceipt', paymentReceipt);

//         try {
//             await api.post('/users/register', data, {
//                 headers: { 'Content-Type': 'multipart/form-data' }
//             });
//             onSuccess();
//         } catch (err) {
//             setError(err.response?.data?.message || 'Something went wrong. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="max-w-2xl mx-auto glass-card p-6 sm:p-10 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
//             <h2 className="text-2xl sm:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
//                 Software Engineer Registration
//             </h2>

//             {error && (
//                 <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3 text-red-400">
//                     <AlertCircle size={20} />
//                     <span>{error}</span>
//                 </div>
//             )}

//             <form onSubmit={handleSubmit} className="space-y-6">
//                 <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         required
//                         className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//                         placeholder="John Doe"
//                         onChange={handleChange}
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
//                     <input
//                         type="email"
//                         name="email"
//                         required
//                         className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//                         placeholder="john@example.com"
//                         onChange={handleChange}
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-sm font-medium text-gray-300 mb-2">Preferred Stack</label>
//                     <select
//                         name="stack"
//                         required
//                         className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//                         onChange={handleChange}
//                     >
//                         <option value="">Select a stack</option>
//                         <option value="Frontend">Frontend (React)</option>
//                         <option value="Backend">Backend (Express)</option>
//                         <option value="Fullstack">Fullstack(Frontend and Backend)</option>

//                     </select>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-300 mb-2">Passport Photo</label>
//                         <div className="relative group">
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 required
//                                 onChange={(e) => setPassportPhoto(e.target.files[0])}
//                                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
//                             />
//                             <div className={`border-2 border-dashed ${passportPhoto ? 'border-emerald-500 bg-emerald-500/5' : 'border-slate-700 group-hover:border-blue-500'} rounded-lg p-4 text-center transition-all`}>
//                                 <Upload className={`mx-auto mb-2 ${passportPhoto ? 'text-emerald-400' : 'text-gray-500'}`} />
//                                 <span className="text-xs text-gray-400 truncate block">
//                                     {passportPhoto ? passportPhoto.name : 'Click to upload passport'}
//                                 </span>
//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-300 mb-2">Payment Receipt</label>
//                         <div className="relative group">
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 required
//                                 onChange={(e) => setPaymentReceipt(e.target.files[0])}
//                                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
//                             />
//                             <div className={`border-2 border-dashed ${paymentReceipt ? 'border-emerald-500 bg-emerald-500/5' : 'border-slate-700 group-hover:border-blue-500'} rounded-lg p-4 text-center transition-all`}>
//                                 <Upload className={`mx-auto mb-2 ${paymentReceipt ? 'text-emerald-400' : 'text-gray-500'}`} />
//                                 <span className="text-xs text-gray-400 truncate block">
//                                     {paymentReceipt ? paymentReceipt.name : 'Click to upload receipt'}
//                                 </span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <button
//                     type="submit"
//                     disabled={loading}
//                     className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl transition-all flex justify-center items-center gap-2 transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                     {loading ? (
//                         <>
//                             <Loader2 className="animate-spin" />
//                             Registering...
//                         </>
//                     ) : (
//                         <>
//                             <CheckCircle size={20} />
//                             Complete Registration
//                         </>
//                     )}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default RegistrationForm;


import React, { useState } from 'react';
import api from '../services/api';
import {
    Upload,
    CheckCircle,
    AlertCircle,
    Loader2
} from 'lucide-react';

const RegistrationForm = ({ onSuccess }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        stack: ''
    });

    const [passportPhoto, setPassportPhoto] = useState(null);
    const [paymentReceipt, setPaymentReceipt] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');

        if (!paymentReceipt) {
            setError('Payment receipt is mandatory.');
            return;
        }

        setLoading(true);

        const data = new FormData();

        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('stack', formData.stack);
        data.append('passportPhoto', passportPhoto);
        data.append('paymentReceipt', paymentReceipt);

        try {
            await api.post('/users/register', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            onSuccess();

        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Something went wrong. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">

            <div className="w-full max-w-4xl">

                <div className="glass-card backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-5 sm:p-8 lg:p-10 animate-in fade-in duration-700">

                    {/* HEADER */}
                    <div className="text-center mb-8 sm:mb-10">

                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                            Software Engineer Registration
                        </h2>

                        <p className="text-gray-400 mt-3 text-sm sm:text-base">
                            Complete the form below to register successfully
                        </p>
                    </div>

                    {/* ERROR */}
                    {error && (
                        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-red-500/40 bg-red-500/10 p-4 text-red-400">
                            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />

                            <p className="text-sm sm:text-base break-words">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >

                        {/* INPUT GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            {/* NAME */}
                            <div>
                                <label className="block text-sm sm:text-base font-medium text-gray-300 mb-2">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    required
                                    placeholder="John Doe"
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-slate-700 bg-slate-800/70 px-4 py-3.5 text-sm sm:text-base text-white outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                                />
                            </div>

                            {/* EMAIL */}
                            <div>
                                <label className="block text-sm sm:text-base font-medium text-gray-300 mb-2">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="john@example.com"
                                    onChange={handleChange}
                                    className="w-full rounded-2xl border border-slate-700 bg-slate-800/70 px-4 py-3.5 text-sm sm:text-base text-white outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                                />
                            </div>
                        </div>

                        {/* STACK */}
                        <div>
                            <label className="block text-sm sm:text-base font-medium text-gray-300 mb-2">
                                Preferred Stack
                            </label>

                            <select
                                name="stack"
                                required
                                onChange={handleChange}
                                className="w-full rounded-2xl border border-slate-700 bg-slate-800/70 px-4 py-3.5 text-sm sm:text-base text-white outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20"
                            >
                                <option value="">Select a stack</option>
                                <option value="Frontend">
                                    Frontend (React)
                                </option>

                                <option value="Backend">
                                    Backend (Express)
                                </option>

                                <option value="Fullstack">
                                    Fullstack (Frontend + Backend)
                                </option>
                            </select>
                        </div>

                        {/* FILE UPLOADS */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* PASSPORT */}
                            <div>
                                <label className="block text-sm sm:text-base font-medium text-gray-300 mb-2">
                                    Passport Photo
                                </label>

                                <div className="relative group">

                                    <input
                                        type="file"
                                        accept="image/*"
                                        required
                                        onChange={(e) =>
                                            setPassportPhoto(
                                                e.target.files[0]
                                            )
                                        }
                                        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                                    />

                                    <div
                                        className={`min-h-[180px] rounded-2xl border-2 border-dashed p-6 flex flex-col items-center justify-center text-center transition-all
                                        ${passportPhoto
                                                ? 'border-emerald-500 bg-emerald-500/10'
                                                : 'border-slate-700 bg-slate-900/40 group-hover:border-blue-500'
                                            }`}
                                    >

                                        <Upload
                                            className={`mb-3 w-9 h-9 ${passportPhoto
                                                    ? 'text-emerald-400'
                                                    : 'text-gray-500'
                                                }`}
                                        />

                                        <p className="text-sm text-gray-400 break-all">
                                            {passportPhoto
                                                ? passportPhoto.name
                                                : 'Click to upload passport photo'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* RECEIPT */}
                            <div>
                                <label className="block text-sm sm:text-base font-medium text-gray-300 mb-2">
                                    Payment Receipt
                                </label>

                                <div className="relative group">

                                    <input
                                        type="file"
                                        accept="image/*"
                                        required
                                        onChange={(e) =>
                                            setPaymentReceipt(
                                                e.target.files[0]
                                            )
                                        }
                                        className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                                    />

                                    <div
                                        className={`min-h-[180px] rounded-2xl border-2 border-dashed p-6 flex flex-col items-center justify-center text-center transition-all
                                        ${paymentReceipt
                                                ? 'border-emerald-500 bg-emerald-500/10'
                                                : 'border-slate-700 bg-slate-900/40 group-hover:border-blue-500'
                                            }`}
                                    >

                                        <Upload
                                            className={`mb-3 w-9 h-9 ${paymentReceipt
                                                    ? 'text-emerald-400'
                                                    : 'text-gray-500'
                                                }`}
                                        />

                                        <p className="text-sm text-gray-400 break-all">
                                            {paymentReceipt
                                                ? paymentReceipt.name
                                                : 'Click to upload receipt'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 font-bold text-white text-sm sm:text-base transition-all hover:scale-[1.01] hover:from-blue-500 hover:to-indigo-500 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60 flex items-center justify-center gap-2"
                        >

                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Registering...
                                </>
                            ) : (
                                <>
                                    <CheckCircle className="w-5 h-5" />
                                    Complete Registration
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default RegistrationForm;