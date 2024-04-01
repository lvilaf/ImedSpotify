const express = require('express');
const router = express.Router();
const { obtenerAccessToken, buscarSpotify, agregarFavorito, obtenerFavoritos } = require('../controllers/spotify.controller');

router.get('/buscarSpotify', async (req, res) => {
    try {
        const accessToken = await obtenerAccessToken(); 
        const query = req.query.query; 
        const resultados = await buscarSpotify(query, accessToken); 
        res.json(resultados);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en la búsqueda de Spotify');
    }
});

router.post('/favoritos', async (req, res) => {
    try {
        const album = await agregarFavorito(req.body);
        res.json(album);
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar el álbum en favoritos' });
    }
});

router.get('/getFavoritos', async (req, res) => {
    try {
        const albums = await obtenerFavoritos();
        res.json(albums);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener todos los álbumes' });
    }
});

module.exports = router;
