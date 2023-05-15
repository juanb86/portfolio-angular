import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../servicios/portfolio.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css'],
})
export class ProyectosComponent implements OnInit {
  proyectos: any[] = [];
  modalModificarVisible = false;
  proyectoSeleccionado: any;
  formData = {
    personaId: 1,
    nuevoProyecto: null,
    proyectoModificado: null,
  };

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.actualizarProyectos(this.formData.personaId);
  }

  agregarProyecto(id: number, proyecto: any): void {
    this.portfolioService
      .agregarProyectoAPersona(id, proyecto)
      .subscribe(() => {
        this.actualizarProyectos(id);
      });
  }

  borrarProyecto(id: number): void {
    this.portfolioService.eliminarProyecto(id).subscribe(() => {
      this.actualizarProyectos(id);
    });
  }

  modificarProyecto(id: number, nombre: string): void {
    this.portfolioService.modificarProyecto(id, nombre).subscribe(() => {
      this.actualizarProyectos(id);
      this.cerrarModalModificar();
    });
  }

  actualizarProyectos(id: number): void {
    this.portfolioService.getProyectosPorPersona(id).subscribe((proyectos) => {
      this.proyectos = proyectos;
    });
  }

  abrirModalModificar(proyecto: any): void {
    this.proyectoSeleccionado = proyecto;
    this.modalModificarVisible = true;
  }

  cerrarModalModificar(): void {
    this.modalModificarVisible = false;
  }
}
