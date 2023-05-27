import express from 'express';
import {mainRouter} from './routes/main.js';

const app = express();

app.use(express.json());
app.use('/', mainRouter);

app.listen(3000, () => console.log('Listening on http://localhost:3000'));