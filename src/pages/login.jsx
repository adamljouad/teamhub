import { useAuth } from '../context/AuthContext.jsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/login.css'


function Login() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const { login } = useAuth()
  const [message, setMessage] = useState('')


  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!userEmail || !userPassword) {
      setMessage('Email e Password sono obbligatori');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:19246/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmail, password: userPassword }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage('Login effettuato con successo');
        login(userEmail);
        navigate('/dashboard');
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setMessage('Errore del server');
      console.error('Errore durante il login', err);
    }
  };
  
  /*
  const tryLogin = (e) => {
    e.preventDefault()

    try {
      login(userEmail, userPassword);
      navigate('/dashboard');
    } catch (err) {
      setError('Credenziali non valide. Riprova.');
    }

    navigate('/dashboard')
  }
  */



  return (
    <div className='login-page'>
      <div className='team-hub'>
        <h1>TeamHUB</h1>
      </div>
      <div className='Header'>
        <h1>Login</h1>
      </div>
      <form onSubmit={handleLogin}>
        <div className='input-containers'>
          <input className='email-input' type='text' value={userEmail} onChange={(e) => setUserEmail(e.target.value)}></input>
          <input className='password-input' type='password' value={userPassword} onChange={(e) => setUserPassword(e.target.value)}></input>
        </div>
        <div className='button-container'>
        <button className='login-button' type='submit'>Login</button>
        <h2>{message}</h2>
        </div>
      </form>
    </div>
  )

}

export default Login