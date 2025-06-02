import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import './Login.css';
import logo from '/logo.png';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const overlayRef = useRef<HTMLDivElement>(null);
  const loginContentRef = useRef<HTMLDivElement>(null);

  const validateForm = () => {
    let isValid = true;

    // Email validation
    if (!email) {
      setEmailError('Vui lòng điền vào trường này.');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Password validation
    if (!password) {
      setPasswordError('Vui lòng điền vào trường này.');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Add actual login logic here
      console.log('Login attempted', { email, password });
      // Navigate to homepage after successful login
      navigate('/homepage');
    }
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (overlayRef.current && loginContentRef.current) {
      // Create a unique transition effect
      const tl = gsap.timeline();
      
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut'
      }).to(loginContentRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          navigate('/register');
        }
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="decorative-circle decorative-circle-1"></div>
        <img src={logo} alt="F Cinema Logo" className="logo" />
        <h1>Chào mừng trở lại</h1>
        <p>Trải nghiệm những bộ phim tuyệt vời nhất tại rạp chiếu phim hiện đại</p>
        <div className="decorative-circle decorative-circle-2"></div>
      </div>
      <div className="login-right">
        <div ref={loginContentRef} className="login-content">
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email của bạn"
              />
              {emailError && <div className="error-message">{emailError}</div>}
            </div>
            <div className="form-group">
              <label>Mật khẩu</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
              />
              {passwordError && <div className="error-message">{passwordError}</div>}
            </div>
            <button type="submit" className="login-btn">Đăng nhập</button>
            <div className="login-footer">
              Chưa có tài khoản? <a href="#" onClick={handleRegisterClick}>Đăng ký ngay</a>
            </div>
          </form>
        </div>
      </div>
      <div ref={overlayRef} className="transition-overlay"></div>
    </div>
  );
};

export default Login; 