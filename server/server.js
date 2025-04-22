import express from 'express';
import dotenv from 'dotenv';
import pkg from 'pg';
import cors from 'cors'

const { Pool } = pkg;

dotenv.config();

const app = express();
const port = 19246;

app.use(cors());
app.use(express.json()); // 👈 NECESSARIO
app.use(express.urlencoded({ extended: true })); // 👈 CONSIGLIATO

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
