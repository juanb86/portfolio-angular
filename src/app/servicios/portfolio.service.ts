import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getProyectosPorPersona(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/personas/${id}/proyectos`);
  }

  agregarProyectoAPersona(id: number, proyecto: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiUrl}/personas/${id}/proyectos`,
      JSON.stringify(proyecto)
    );
  }

  eliminarProyecto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/proyectos/${id}`);
  }

  modificarProyecto(id: number, nombre: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/proyectos/${id}`, { nombre });
  }
}
