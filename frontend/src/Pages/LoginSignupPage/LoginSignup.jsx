// LoginSignup.jsx
import React, { useState } from 'react';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import './LoginSignup.css';
import { useAuthStore } from '../../Store/useAuthStore';


// TODO deleting this component;
const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className='login-signup-auth-pattern'>
      <div className='login-signup-auth-content'>
        <div className='login-signup-grid'>
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className={`login-signup-square ${i % 2 === 0 ? 'login-signup-animate' : ''}`}
            />
          ))}
        </div>
        <h2 className='login-signup-title'>{title}</h2>
        <p className='login-signup-subtitle'>{subtitle}</p>
      </div>
    </div>
  );
};

const LoginSignup = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const { login, isLoggingIn, signup, isSigningUp } = useAuthStore();
  const authAction = isLoginPage ? login : signup;
  const loading = isLoginPage ? isLoggingIn : isSigningUp;
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    authAction(formData);
  };

  return (
    <div className='login-signup-container'>
      <div className='login-signup-form-section'>
        <div className='login-signup-form-box'>
          <div className='login-signup-logo'>
            <div className='login-signup-icon-box'>
              <MessageSquare className='login-signup-icon' />
            </div>
            <h1 className='login-signup-header'>{isLoginPage ? 'Sign In' : 'Create Account'}</h1>
            <p className='login-signup-description'>
              {isLoginPage ? 'Welcome back! Sign in to continue' : 'Get started with your free account'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className='login-signup-form'>
            {!isLoginPage && (
              <div className='login-signup-form-group'>
                <label className='login-signup-label'>Full Name</label>
                <div className='login-signup-input-box'>
                  <User className='login-signup-icon-input' />
                  <input
                    type='text'
                    className='login-signup-input'
                    placeholder='Name'
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
              </div>
            )}

            <div className='login-signup-form-group'>
              <label className='login-signup-label'>Email</label>
              <div className='login-signup-input-box'>
                <Mail className='login-signup-icon-input' />
                <input
                  type='email'
                  className='login-signup-input'
                  placeholder='you@example.com'
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className='login-signup-form-group'>
              <label className='login-signup-label'>Password</label>
              <div className='login-signup-input-box'>
                <Lock className='login-signup-icon-input' />
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='login-signup-input'
                  placeholder='******'
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type='button'
                  className='login-signup-password-toggle'
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className='login-signup-icon-input' />
                  ) : (
                    <Eye className='login-signup-icon-input' />
                  )}
                </button>
              </div>
            </div>

            <button
              type='submit'
              className='login-signup-submit-button'
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className='login-signup-loader' /> Loading...
                </>
              ) : isLoginPage ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <div className='login-signup-footer'>
            <p>
              {isLoginPage ? 'Don\'t have an account?' : 'Already have an account?'}{' '}
              <Link to={isLoginPage ? '/signup' : '/login'} className='login-signup-link'>
                {isLoginPage ? 'Create Account' : 'Sign In'}
              </Link>
            </p>
          </div>
        </div>
      </div>

      <AuthImagePattern
        title='Join our community'
        subtitle='Connect with friends, share moments, and stay in touch with you'
      />
    </div>
  );
};

export default LoginSignup;