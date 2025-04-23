import express from 'express';
import dotenv from 'dotenv';
import pkg from 'pg';
import cors from 'cors'

const { Pool } = pkg;

dotenv.config();

const app = express();
const port = 19246;

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
console.log("🔧 Connessione al DB con:", process.env.DATABASE_URL);


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect()
  .then(() => console.log('Connesso al database'))
  .catch(err => console.error('Errore di connessione', err));

app.get('/api', (req, res) => {
  res.json({ message: 'API attiva' });
});

app.post('/requests', async (req, res) => {
  const {
    category,
    start_date,
    start_time,
    end_date,
    end_time,
    user_id,
    date
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO requests (
        category, start_date, start_time,
        end_date, end_time, user_id,
        date, status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
       [
        category,
        start_date,
        start_time,
        end_date,
        end_time,
        user_id,
        date,
        'in attesa'
       ]
    )
    res.status(201).json({
      message: 'Richiesta creata con successo',
      request: result.rows[0]
    })
  } catch (err) {
    console.error('Errore durante la rchiesta', err);
    res.status(500).json({message: 'Errore del server'})
  }
})

app.get('/requests', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM requests');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Errore nel server');
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Body ricevuto:", req.body);

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e password sono obbligatori' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Utente non trovato' });
    }

    const user = result.rows[0];

    if (password !== user.password) {
      return res.status(400).json({ message: 'Password errata' });
    }

    res.status(200).json({ message: 'Login effettuato con successo' });
  } catch (err) {
    console.error('Errore durante il login', err);
    res.status(500).json({ message: 'Errore del server' });
  }
});




app.listen(port, () => {
  console.log(`Server in ascolto sulla porta ${port}`);
});

pool.query('SELECT * FROM requests', (err, res) => {
  if (err) {
    console.error('Errore nella query:', err);
  } else {
    console.log('Dati ricevuti:', res.rows);
  }
});
