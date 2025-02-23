import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      // setIsRegisterClicked(true);
      await axios.post('http://localhost:5000/auth/register', { username, password });
      alert('Registration successful. Please login to access your account');

      (document.getElementById('reg_username') as HTMLInputElement).value = '';
      (document.getElementById('reg_password') as HTMLInputElement).value = '';

      setUsername('');
      setPassword('');  

      navigate('/home');
    } catch (err) {
      alert("Registration failed. Either username already exists or server error. Try a different username or try again later.");
      console.error('Registration failed', err);
    }
  };


  return (
    <div className="auth-container">
      <h2>Register</h2>
      <p>If you are a new user.</p>
      <input type="text" placeholder="Username" id="reg_username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" id="reg_password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
