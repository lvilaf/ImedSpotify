const fetch = require('node-fetch');
const querystring = require('querystring');
const dotenv = require('dotenv');
const pool = require('../db'); // Ajusta la ruta relativa según sea necesario


dotenv.config();

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

async function obtenerAccessToken() {
  try {
      const auth = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
      
      const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Authorization': `Basic ${auth}`
          },
          body: querystring.stringify({
              grant_type: 'client_credentials'
          })
      });

      const data = await response.json();
      return data.access_token;
  } catch (error) {
      console.error('Error fetching access token:', error);
      throw new Error('Error obteniendo el token de acceso de Spotify');
  }
}

async function buscarSpotify(query, accessToken) {
  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&market=ES`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      throw new Error('Error al realizar la búsqueda en Spotify');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error al realizar la búsqueda en Spotify: ' + error.message);
  }
}

// Asumiendo que este código va en spotify.controller.js

// Función para agregar un álbum a favoritos
async function agregarFavorito(albumData) {
  const { nombreartista, nombreAlbum, totalcanciones, anoalbum, imagenalbumurl, idspotify } = albumData;
  try {
      const result = await pool.query(
          'INSERT INTO albums (nombreartista, nombreAlbum, totalcanciones, anoalbum, imagenalbumurl, idspotify) VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT (idspotify) DO NOTHING RETURNING *',
          [nombreartista, nombreAlbum, totalcanciones, anoalbum, imagenalbumurl, idspotify]
      );
      return result.rows[0];
  } catch (error) {
      console.error('Error al guardar el álbum en favoritos:', error);
      throw error;
  }
}

// Función para obtener todos los álbumes favoritos
async function obtenerFavoritos() {
  try {
      const result = await pool.query('SELECT * FROM albums');
      return result.rows;
  } catch (error) {
      console.error('Error al obtener todos los álbumes:', error);
      throw error;
  }
}

module.exports = {
obtenerAccessToken,
buscarSpotify, // Esta ya estaba definida
agregarFavorito,
obtenerFavoritos
};


