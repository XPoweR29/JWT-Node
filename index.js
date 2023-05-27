import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Witaj na stronie głównej');
});

app.get('/admin', (req, res) => {
    res.send('Witaj w panelu admina');
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));