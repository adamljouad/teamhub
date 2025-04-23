import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/dashboard.css'


function Dashboard() {
  const [data, setData] = useState(null);
  const navigate = useNavigate()

  const [requestCategory, setRequestCategory] = useState('ferie');
  const { logout } = useAuth()
  const [requests, setRequests] = useState([]);
  const [holidayBalance, setHolidayBalance] = useState({
    ferie: 20,
    permesso: 8
  });
  const [permessoDate, setPermessoDate] = useState('');
  const [permessoStart, setPermessoStart] = useState('');
  const [permessoEnd, setPermessoEnd] = useState('');
  const [ferieStart, setFerieStart] = useState('');
  const [ferieEnd, setFerieEnd] = useState('');
  const { user } = useAuth();

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:19246/requests', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify({category: requestCategory, start_date: ferieStart, end_date: ferieEnd, user_id: user.id})
      })
      const data = await response.json();
      if (response.ok) {
        console.log('Richiesta salvata')
      } else {
        console.log('problema nella richiesta')
      }
    } catch (err) {
      console.error('Errore nel server', err)
    }

  }

  const showReq = async () => {
    try {
      const response = await fetch(`http://localhost:19246/requests?user_id=${parseInt(user.id)}`)
      const data = await response.json();
      setRequests(data);
    } catch (err) {
      console.error('Errore nel recupero delle richieste', err)
    }
  };

  useEffect(() => {
    if (user?.id) {
      showReq();
    }
  }, [user]);
  



  const goOut = (e) => {
    e.preventDefault()

    try {
      logout()
    }
    catch (err) {
      setError('errore nel logout')
    }
  }



  return (
    <div className="dashboard">
    <div className="dashboard-sidebar">
      <button onClick={() => {navigate('/login')}}>My requests</button>
      <h2>Settings</h2>
    </div>
    <div className="dashboard-main">
      <div className="dashboard-header">
        <h1>Benvenuto in TeamHub</h1>
        <button onClick={goOut}>Log Out</button>
      </div>
      <div className="dashboard-content">
      <form className='request-form' onSubmit={handleRequestSubmit}>
      <label>
        Tipo Richiesta:
        <select value={requestCategory} onChange={(e) => setRequestCategory(e.target.value)}>
          <option value="ferie">Ferie</option>
          <option value="permesso">Permesso</option>
        </select>
      </label>

      {requestCategory === 'permesso' && (
        <>
          <label>
            Data Richiesta
            <input type='date' className='input-date-permesso' value={permessoDate} onChange={(e) => setPermessoDate(e.target.value)}></input>
          </label>
          <label>
            Da:
            <input type='time' className='time-input' value={permessoStart} onChange={(e) => setPermessoStart(e.target.value)} />
          </label>
          <label>
            A:
            <input type='time' className='time-input' value={permessoEnd} onChange={(e) => setPermessoEnd(e.target.value)} />
          </label>
        </>
      )}
      {requestCategory === 'ferie' && (
        <>
          <label>
            Da:
            <input type='date' className='time-input' value={ferieStart} onChange={(e) => setFerieStart(e.target.value)} />
          </label>
          <label>
            A:
            <input type='date' className='time-input' value={ferieEnd} onChange={(e) => setFerieEnd(e.target.value)} />
          </label>
        </>
      )}
      <button type='submit'>Invia Richiesta</button>
    </form>
      </div>
      <div className="holiday-info">
          <h2>Ferie rimanenti:</h2>
          <p>{holidayBalance.ferie} giorni</p>
          <h2>Ore permesso rimanenti:</h2>
          <p>{holidayBalance.permesso} ore</p>
        </div>
        <div className='requests-div'>
      {requests.map(req => (
        <div key={req.id}>
          <p>Categoria: {req.category}</p>
          <p>Data inizio: {req.start_date}</p>
          <p>Data fine: {req.end_date}</p>
          <p>Status: {req.status}</p>
        </div>
        ))}
      </div>
    </div>
  </div>
  

  )

}

export default Dashboard