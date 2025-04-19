import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/dashboard.css'


function Dashboard() {
  const [requestCategory, setRequestCategory] = useState('');
  const [holidayDate, setHolidayDate] = useState('');
  const { logout } = useAuth()
  const [requests, setRequests] = useState([]);
  const [holidayBalance, setHolidayBalance] = useState({
    ferie: 20,
    permesso: 8
  })

  const handleRequestSubmit = (e) => {
    e.preventDefault();

    setRequests(prev => [...prev, {
      category: requestCategory,
      requestDate: holidayDate
    }])
    console.log(requests)
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

          <label>
            Data Richiesta:
            <input type='date' value={holidayDate} onChange={(e) => setHolidayDate(e.target.value)}></input>
          </label>
          <button type='submit'>Invia Richiesta</button>
        </form>
        {requestCategory === 'permesso' && <input type='time'></input>}
        <h1>Ferie Rimanente: {holidayBalance.ferie} Giorni</h1>
        <h1>Ore permesso rimanenti: {holidayBalance.permesso} Ore</h1>
      </div>
    </div>
  </div>
  

  )

}

export default Dashboard