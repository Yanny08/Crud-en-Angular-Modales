import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habilidad } from '../Models/habilidad.model';

@Injectable({
  providedIn: 'root'
})
export class HabilidadService {

  URL = 'http://localhost:8080/habilidades/';

  
  
  constructor(private http: HttpClient) { }


  public getHabilidad()  {
    return this.http.get<Habilidad[]>(this.URL + 'traer');
  }
  public getPersonaId(id: any): Observable<Habilidad> {
    return this.http.get<Habilidad>(this.URL + 'traer/' + id);
  }
  public addPersona(habilidad: Habilidad) {
    return this.http.post<Habilidad>(this.URL + 'crear', habilidad);
  }

  public deleteHabilidad(id: any) {
    return this.http.delete<Habilidad>(this.URL + 'borrar/' + id);
  }

  public updatePersona(habilidad: Habilidad) {
    return this.http.put<Habilidad>(this.URL + 'editar/'+ habilidad.id,habilidad)
  }
 
}
