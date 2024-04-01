CREATE TABLE IF NOT EXISTS albums (
    id SERIAL PRIMARY KEY,
    nombreartista VARCHAR(255),
    nombreAlbum VARCHAR(255),
    totalcanciones INTEGER,
    anoalbum VARCHAR(4),
    imagenalbumurl TEXT,
    idspotify VARCHAR(255) UNIQUE
);