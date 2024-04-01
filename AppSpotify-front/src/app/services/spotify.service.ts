import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  buscar(query: string) {
    return this.http.get(`${this.baseUrl}/buscarSpotify`, { params: { query } });
  }

agregarFavorito(album: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/favoritos`, album);
}

getFavoritos(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/getFavoritos`);
}

}
