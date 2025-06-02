import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '/logo.png';

const Register: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp');
      return;
    }

    // Add registration logic here
    console.log('Registration attempted', { 
      fullName, 
      birthDate, 
      email, 
      phone, 
      password 
    });

    // Navigate to login page after successful registration
    navigate('/login');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleHomeClick = () => {
    navigate('/homepage');
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className="decorative-circle decorative-circle-1"></div>
        <img src={logo} alt="F Cinema Logo" className="logo" />
        <h1>Tham gia cùng chúng tôi</h1>
        <p>Khám phá thế giới điện ảnh đầy màu sắc với hàng ngàn bộ phim hấp dẫn</p>
        <div className="decorative-circle decorative-circle-2"></div>
      </div>
      <div className="login-right">
        <form className="login-form" onSubmit={handleRegister}>
          <h2>Đăng Ký</h2>
          <div className="form-group">
            <label>Họ và tên</label>
            <input 
              type="text" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nhập họ và tên"
              required 
            />
          </div>
          <div className="form-group">
            <label>Ngày sinh</label>
            <input 
              type="date" 
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              required 
            />
          </div>
          <div className="form-group">
            <label>Số điện thoại</label>
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại"
              required 
            />
          </div>
          <div className="form-group">
            <label>Mật khẩu</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required 
            />
          </div>
          <div className="form-group">
            <label>Xác nhận mật khẩu</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu"
              required 
            />
          </div>
          <button type="submit" className="login-btn">Đăng ký</button>
          <div className="login-footer">
            Đã có tài khoản? <a href="#" onClick={handleLoginClick}>Đăng nhập ngay</a>
          </div>
          <div className="social-login">
            <button type="button" className="social-login-btn" onClick={handleHomeClick}>Về Trang Chủ</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register; 