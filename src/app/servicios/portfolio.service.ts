import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private apiUrl = 'https://portfolio-personal-cvpl.onrender.com';

  constructor(private http: HttpClient) {}

  // Endpoints Personas
  obtenerPersona(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/persona/1`);
  }

  modificarPersona(persona: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/persona`, persona);
  }

  // Endpoints Educacion
  obtenerEducacion(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/educacion/user/3`);
  }

  modificarEducacion(id: number, educacion: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/educacion/${id}`, educacion);
  }

  borrarEducacion(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/educacion/${id}`);
  }

  crearEducacion(educacion: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/educacion`, educacion);
  }

  // Endpoints Habilidad
  obtenerHabilidad(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/habilidad/user/3`);
  }

  modificarHabilidad(id: number, habilidad: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/habilidad/${id}`, habilidad);
  }

  borrarHabilidad(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/habilidad/${id}`);
  }

  crearHabilidad(habilidad: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/habilidad`, habilidad);
  }

  // Endpoints Experiencia
  obtenerExperiencia(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/experiencia/user/3`);
  }

  modificarExperiencia(id: number, experiencia: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/experiencia/${id}`, experiencia);
  }

  borrarExperiencia(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/experiencia/${id}`);
  }

  crearExperiencia(experiencia: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/experiencia`, experiencia);
  }

  // Endpoints Proyecto
  obtenerProyecto(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/proyecto/user/3`);
  }

  modificarProyecto(id: number, proyecto: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/proyecto/${id}`, proyecto);
  }

  borrarProyecto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/proyecto/${id}`);
  }

  crearProyecto(proyecto: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/proyecto`, proyecto);
  }
}
