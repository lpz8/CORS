const express = require('express');
const axios = require('axios');
const app = express();
const port = 3002; 


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.get('/', (req, res) => {
    res.send('Bienvenido a la API de Rick and Morty. Usa /characters o /characters/:name');
});


app.get('/characters', async (req, res) => {
    try {
        const response = await axios.get('https://rickandmortyapi.com/api/character/');
        res.json(response.data.results);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los personajes' });
    }
});


app.get('/characters/:name', async (req, res) => {
    try {
        const name = req.params.name.toLowerCase();
        const response = await axios.get('https://rickandmortyapi.com/api/character/?name=' + name);
        if (response.data.results.length > 0) {
            res.json(response.data.results[0]);
        } else {
            res.status(404).json({ error: 'Personaje no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar el personaje' });
    }
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});