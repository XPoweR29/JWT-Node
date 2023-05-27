import express from 'express';

const app = express();

//database mockup 
const users = [
    {id: 1, name: 'John', email: 'john@example.com'},
    {id: 2, name: 'Chris', email: 'chris123@example.com'},
];


app.get('/', (req, res) => {
    res.send('Witaj na stronie głównej');
});

app.get('/admin', (req, res) => {
    res.send('Witaj w panelu admina');
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));