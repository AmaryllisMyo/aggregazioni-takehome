import express from 'express';
import { db } from './assets/db.ts';
import { aggregaDati } from './logic/aggregazione.ts';

const router = express.Router();

router.get('/records', (req, res) => {
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
    res.status(500).json({ error: 'Error 500 o_o' });
  }
});

router.get('/records/raw', (req, res) => {
  res.json(db.records);
});

export default router;