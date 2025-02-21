import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import { jwtDecode } from 'jwt-decode';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const resetFields = () => {
    (document.getElementById('login_username') as HTMLInputElement).value = '';
    (document.getElementById('login_password') as HTMLInputElement).value = '';
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { username, password });
      auth?.login(response.data.token);

      // Decode token to get userId
      const decodedToken: { id: string; exp: number } = jwtDecode(response.data.token);
      console.log("User ID:", decodedToken.id);

      // Store userId in sessionStorage
      sessionStorage.setItem("userId", decodedToken.id);

      resetFields();

      setUsername('');
      setPassword('');  

      navigate('/dashboard');
    } catch (err) {
      console.error('Login failed', err);

      if (axios.isAxiosError(err) && err.response?.status === 400) {
        alert('Invalid username or password');  
        resetFields();  
        return;
      }

      if (axios.isAxiosError(err) && err.response?.status === 500) {
        alert('Internal server error. Please try again later');  
        resetFields();  
        return;
      }

    }
  };

 
  return (
    <>
      <div className='auth-container'>
        <h2>Login</h2>
        <p>If you are an existing user.</p>
        <input type="text" placeholder="Username"  id="login_username" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" id="login_password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
      </div>
    </>
  );
};

export default Login;
