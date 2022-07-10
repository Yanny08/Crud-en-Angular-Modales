import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Resumen} from '../Models/resumen.model';

@Injectable({
  providedIn: 'root'
})
export class ResumenService {

  URL = 'http://localhost:8080/resumen/';

  constructor(private http: HttpClient) { }

 

  public getResumen()  {
    return this.http.get<Resumen[]>(this.URL + 'traer');
  }
  public getResumenId(id: any): Observable<Resumen> {
    return this.http.get<Resumen>(this.URL + 'traer/' + id);
  }
  public addResumen(resumen:Resumen) {
    return this.http.post<Resumen>(this.URL + 'crear', resumen);
  
  }

  public deleteResumen(id: any) {
    return this.http.delete<Resumen>(this.URL + 'borrar/' + id);
  }

  public updateResumen(resumen: Resumen) {
    return this.http.put<Resumen>(this.URL + 'editar/'+ resumen.id,resumen)
   
  }
 
}
