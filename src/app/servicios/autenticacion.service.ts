import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionService {
  url = 'https://portfolio-personal-cvpl.onrender.com/auth/login';
  currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient) {
    console.log('Servicio autenticacion funcionando.');
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(sessionStorage.getItem('currentUser') || '{}')
    );
  }

  IniciarSesion(credenciales: any): Observable<any> {
    return this.http.post(this.url, credenciales).pipe(
      map((data) => {
        sessionStorage.setItem('currentUser', JSON.stringify(data));
        this.currentUserSubject.next(data);
        return data;
      })
    );
  }

  CerrarSesion() {
    sessionStorage.setItem('currentUser', '');
  }

  get UsuarioAutenticado() {
    return this.currentUserSubject.value;
  }

  get esUsuarioAutenticado() {
    var currentUser = this.currentUserSubject.value;
    return currentUser && currentUser.accessToken;
  }
}
