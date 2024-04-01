import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent implements OnInit {
  query: string = '';
  albums: any[] = []; 

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.obtenerFavoritos();
  }

  buscar() {
    if (!this.query) return; 

    this.spotifyService.buscar(this.query).subscribe({
      next: (data: any) => { 
        this.albums = data.albums.items; 
      },
      error: (error) => {
        console.error('Error al buscar en Spotify:', error);
      }
    });
  }

  obtenerFavoritos() {
    this.spotifyService.getFavoritos().subscribe({
      next: (data: any[]) => {
        this.albums = data;
      },
      error: (error: any) => {
        console.error('Error al obtener los álbumes favoritos:', error);
      }
    });
  }

  agregarAFavoritos(album: any) {
    // Extraer solo el año
    const anoalbum = album.release_date.substring(0, 4); 
  
    this.spotifyService.agregarFavorito({
      nombreartista: album.artists[0].name,
      nombreAlbum: album.name,
      totalcanciones: album.total_tracks,
      anoalbum: anoalbum,
      imagenalbumurl: album.images[0]?.url,
      idspotify: album.id
    }).subscribe({
      next: (data: any) => {
        Swal.fire('Álbum agregado a favoritos', '', 'success');
        this.obtenerFavoritos();
      },
      error: (error: any) => {
        Swal.fire('Error al agregar el álbum a favoritos', error.message, 'error');
      }
    });
  }
  
}
