import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../src/styles/login.css'


function Login() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const { login } = useAuth()

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



  return (
    <div className='login-page'>
      <div className='Header'>
        <h1>Login</h1>
      </div>
      <form onSubmit={tryLogin}>
        <div className='input-containers'>
          <input className='email-input' type='text' value={userEmail} onChange={(e) => setUserEmail(e.target.value)}></input>
          <input className='password-input' type='password' value={userPassword} onChange={(e) => setUserPassword(e.target.value)}></input>
        </div>
        <div className='button-container'>
        <button className='login-button' type='submit'>Login</button>
        </div>
      </form>
    </div>
  )

}

export default Login