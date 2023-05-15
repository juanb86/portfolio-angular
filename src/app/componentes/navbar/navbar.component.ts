import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  currentUser = { id: '' };
  estaAutenticado: Boolean = false;

  constructor(private autenticacionService: AutenticacionService) {}

  ngOnInit(): void {
    this.esUsuarioAutenticado();
  }

  logout() {
    this.autenticacionService.CerrarSesion();
    this.esUsuarioAutenticado();
    window.location.reload();
  }

  esUsuarioAutenticado() {
    this.estaAutenticado = Boolean(
      this.autenticacionService.esUsuarioAutenticado
    );
  }
}
