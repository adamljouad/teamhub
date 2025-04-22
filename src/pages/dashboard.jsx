import { useAuth } from '../context/AuthContext'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/dashboard.css'


function Dashboard() {
  const [data, setData] = useState(null);

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



  const handleRequestSubmit = (e) => {
    e.preventDefault();

    console.log(requests)
    let newRequest = {
      category: requestCategory,
      requestDate: ferieStart
    };
  
    if (requestCategory === 'permesso') {
      newRequest.startDate = permessoDate;
      newRequest.startTime = permessoStart;
      newRequest.endTime = permessoEnd;
    } else if (requestCategory === 'ferie') {
      const start = new Date(ferieStart)
      const end = new Date(ferieEnd)

      const timeDiff = end - start;
      const daysDiff = timeDiff/ (1000 * 60 * 60 * 24) + 1;
      if (daysDiff > 0 && daysDiff <= holidayBalance.ferie) {
        setHolidayBalance(prev => ({...prev, ferie: prev.ferie - daysDiff}))
      }
      newRequest.startDate === ferieStart
      newRequest.endDate = ferieEnd
      newRequest.days = daysDiff
    }
    setRequests(prev => [...prev, newRequest]);
    console.log(newRequest);
  }


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
    <div className="dashboard-sidebar"></div>
  
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
    </div>
  </div>
  

  )

}

export default Dashboard