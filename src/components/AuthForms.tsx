import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useThemeStore } from '../store/useThemeStore';

const validatePassword = (password: string) => {
  const requirements = [
    { met: password.length >= 8, text: 'At least 8 characters' },
    { met: /[A-Z]/.test(password), text: 'One uppercase letter' },
    { met: /[a-z]/.test(password), text: 'One lowercase letter' },
    { met: /[0-9]/.test(password), text: 'One number' },
    { met: /[^A-Za-z0-9]/.test(password), text: 'One special character' },
  ];
  return requirements;
};

export function AuthForms() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, signUp, resetPassword } = useAuthStore();
  const { theme } = useThemeStore();

  const passwordRequirements = validatePassword(password);
  const isPasswordStrong = passwordRequirements.every(req => req.met);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (!isLogin && !isPasswordStrong) {
        setError('Please ensure your password meets all requirements');
        return;
      }
      
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password);
      }
    } catch (error: any) {
      if (error.code === 'auth/weak-password') {
        setError('Password is too weak. Please choose a stronger password.');
      } else if (error.code === 'auth/email-already-in-use') {
        setError('Email is already registered. Please try logging in instead.');
      } else if (error.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setError('Invalid email or password.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  const handleResetPassword = async () => {
    try {
      await resetPassword(email);
      alert('Password reset email sent! Please check your inbox.');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        setError('No account found with this email address.');
      } else {
        setError('Failed to send reset email. Please try again.');
      }
    }
  };

  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const inputBg = theme === 'dark' ? 'bg-white/10' : 'bg-gray-100';
  const buttonBg = theme === 'dark' ? 'bg-purple-600' : 'bg-purple-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-xl"
    >
      <h2 className={`text-2xl font-bold mb-6 ${textColor} text-center`}>
        {isLogin ? 'Welcome Back!' : 'Create Account'}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-2 text-red-200">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={`w-full px-4 py-2 rounded-lg ${inputBg} ${textColor}`}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={`w-full px-4 py-2 rounded-lg ${inputBg} ${textColor}`}
          />
        </div>

        {!isLogin && (
          <div className="text-sm space-y-2">
            <p className={`${textColor} font-medium`}>Password requirements:</p>
            <ul className="space-y-1">
              {passwordRequirements.map((req, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-2 ${
                    req.met ? 'text-green-500' : 'text-gray-400'
                  }`}
                >
                  <span className="text-xs">
                    {req.met ? '✓' : '○'}
                  </span>
                  {req.text}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="submit"
          className={`w-full ${buttonBg} text-white py-2 rounded-lg hover:opacity-90 transition-opacity`}
        >
          {isLogin ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError('');
          }}
          className={`text-sm ${textColor} hover:underline`}
        >
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
        </button>
        {isLogin && (
          <button
            onClick={handleResetPassword}
            className={`block mx-auto mt-2 text-sm ${textColor} hover:underline`}
          >
            Forgot password?
          </button>
        )}
      </div>
    </motion.div>
  );
}