import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/dashboard.css'


function Dashboard() {
  const [requestCategory, setRequestCategory] = useState('');
  const [holidayDate, setHolidayDate] = useState('');



  return (
    <div className="dashboard">
    <div className="dashboard-sidebar"></div>
  
    <div className="dashboard-main">
      <div className="dashboard-header">
        <h1>Benvenuto in TeamHub</h1>
      </div>
      <div className="dashboard-content">
        <form className='request-form'>
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
          <button type='submit' onClick={console.log(requestCategory, holidayDate)}>Invia Richiesta</button>
        </form>
      </div>
    </div>
  </div>
  

  )

}

export default Dashboard