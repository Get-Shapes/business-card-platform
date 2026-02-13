import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                navigate('/dashboard');
            } else {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: { username },
                        emailRedirectTo: window.location.origin,
                    },
                });
                if (error) throw error;

                if (data.user) {
                    // Create profile entry
                    const { error: profileError } = await supabase.from('profiles').insert({
                        id: data.user.id,
                        username,
                        email,
                        full_name: username,
                        social_links: [],
                        theme: {
                            primaryColor: '#3b82f6',
                            backgroundColor: '#f3f4f6',
                            cardStyle: 'glass',
                        }
                    });
                    if (profileError) console.error('Profile creation failed:', profileError);
                }

                toast.success('Account created! Please log in.');
                setIsLogin(true);
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className="text-gray-500">
                        {isLogin ? 'Manage your digital business card' : 'Start your digital identity journey today'}
                    </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                    {!isLogin && (
                        <div className="space-y-1">
                            <label className="text-sm font-medium text-gray-700">Username</label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="sascha"
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 text-gray-400" size={20} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="hello@example.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 text-gray-400" size={20} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : (
                            <>
                                {isLogin ? 'Sign In' : 'Create Account'}
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-blue-600 font-medium hover:underline"
                        >
                            {isLogin ? 'Sign up' : 'Log in'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};
