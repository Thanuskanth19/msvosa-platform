import React, { useState } from 'react';
import { ADMIN_ACCESS } from '../assets';
import { Lock, Mail, ShieldCheck, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onLogin: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network check for better UX
    setTimeout(() => {
        if (email === ADMIN_ACCESS.email && password === ADMIN_ACCESS.password) {
            onLogin();
        } else {
            setError('Invalid credentials. Please contact the association secretary.');
            setIsLoading(false);
        }
    }, 600);
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-50 py-12">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md border border-gray-100">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-school-100 mb-4">
                    <ShieldCheck className="w-8 h-8 text-school-900" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 font-serif">Admin Portal</h2>
                <p className="text-sm text-gray-500 mt-2">Restricted access for committee members only.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                    <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm flex items-start gap-2 animate-pulse border border-red-100">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        {error}
                    </div>
                )}
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="email"
                            required
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-school-900 focus:border-school-900 transition-colors"
                            placeholder="admin@msvosa.org"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Lock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="password"
                            required
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-school-900 focus:border-school-900 transition-colors"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-school-900 hover:bg-school-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-school-900 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'Verifying...' : 'Access Dashboard'}
                </button>
            </form>

            <div className="mt-6 text-center">
                <p className="text-xs text-gray-400">
                    Protected by secure authentication. <br/>
                    Unauthorized access is prohibited.
                </p>
            </div>
        </div>
    </div>
  );
};