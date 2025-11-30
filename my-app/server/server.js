import express from 'express';
import cors from 'cors';
import { db } from '../src/assets/db.ts';
import { aggregaDati } from '../src/Logic/aggregazione.ts';

const app = express();
const PORT = 3001;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.get('/api/records', (req, res) => {
  try {

    const { campiAggregazione } = req.query;
    
    let campi = ['project']; 
    if (campiAggregazione && typeof campiAggregazione === 'string') {
      campi = campiAggregazione.split(',');
      console.log(db);
    }
    
    const result = aggregaDati(db.records, campi);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error 500' });
  }
});

app.get('/api/records/raw', (req, res) => {
  res.json(db.records);
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});