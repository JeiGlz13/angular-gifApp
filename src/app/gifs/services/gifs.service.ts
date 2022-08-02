import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey = '8EJFCBTVYRrrnuan7yLLwRClF6AG1M6H';
  private baseUrl = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor(private http: HttpClient) { 
      this._historial = JSON.parse(localStorage.getItem("historialGifs")!) || [];
      this.resultados = JSON.parse(localStorage.getItem("lastSearch")!) || [];
  }

  buscarGifs(query: string = ''){
    query = query.toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);  
      this._historial = this.historial.splice(0,10);
    }
    localStorage.setItem("historialGifs", JSON.stringify(this._historial));

    const params = new HttpParams()
                      .set('api_key', this.apiKey)
                      .set('q', query)
                      .set('limit', '10');
    
    this.http.get<SearchGifsResponse>(`${this.baseUrl}/search`, {params})
             .subscribe(resp=>{
              this.resultados = resp.data;
              localStorage.setItem("lastSearch", JSON.stringify(this.resultados));
            });
  }
}
