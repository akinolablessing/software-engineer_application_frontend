import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import { CheckCircle, Terminal } from 'lucide-react';

const SuccessMessage = () => (
    <div className="max-w-xl mx-auto mt-20 glass-card p-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-500/10 mb-6">
            <CheckCircle className="text-emerald-400" size={64} />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Registration Successful!</h2>
        <p className="text-gray-400 text-lg mb-8">
            Your application has been received. Our team will review your payment receipt and profile shortly.
        </p>
        <button
            onClick={() => window.location.reload()}
            className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-3 rounded-lg transition-all border border-slate-700"
        >
            Register Another User
        </button>
    </div>
);

function App() {
    const [isSuccess, setIsSuccess] = useState(false);

    return (
        <Router>
            <div className="min-h-screen bg-[#0f172a] selection:bg-blue-500/30 flex flex-col">
                {/* Navbar */}
                <nav className="border-b border-white/5 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white group">
                            <div className="bg-blue-600 p-1.5 rounded-lg group-hover:rotate-12 transition-transform">
                                <Terminal size={20} />
                            </div>
                            <span>Christ Care <span className="text-blue-500"> Foundation-Computer</span> <span> Skill Centre</span></span>
                        </Link>
                        <div className="flex gap-4 sm:gap-8">
                            <Link to="/" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">Register</Link>
                            <Link to="/admin/dashboard" className="text-sm sm:text-base text-gray-400 hover:text-white transition-colors">Admin</Link>
                        </div>
                    </div>
                </nav>

                <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <Routes>
                        <Route path="/" element={
                            isSuccess ? <SuccessMessage /> : <RegistrationForm onSuccess={() => setIsSuccess(true)} />
                        } />
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    </Routes>
                </main>

                <footer className="py-8 text-center text-gray-600 border-t border-white/5 bg-[#0f172a]">
                    <div className="container mx-auto px-4">
                        <p className="text-sm sm:text-base">&copy; 2026  Christ Care Foundation-Computer Skill Centre Software Engineer Platform. Built with Passion.</p>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
