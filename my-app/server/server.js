import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//const router = require('./router');


const app = express();
const PORT = 3001;


const isDev = process.env.NODE_ENV !== 'production';

//NB: cors mi serve solo in DEV, in PROD è poi tutto su stessa porta
if(isDev){app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
}
app.use(express.json());

app.use('/api', router);

if (!isDev) {
  const clientPath = path.join(__dirname, '../client/dist');
  app.use(express.static(clientPath));

    app.use((req, res) => {
    res.sendFile(path.join(clientPath, 'index.html'));
  });
}


app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
  if (!isDev) {
    console.log(`Client served from http://localhost:${PORT}`);
  }
});