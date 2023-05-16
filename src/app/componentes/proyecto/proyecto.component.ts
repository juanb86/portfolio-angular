import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css'],
})
export class ProyectoComponent implements OnInit {
  estaAutenticado: Boolean = false;
  agregandoProyecto: Boolean = false;
  modificandoProyectoId: any = null;
  formModificarProyecto: FormGroup;
  formAgregarProyecto: FormGroup;
  proyectos: any;

  constructor(
    private portfolioService: PortfolioService,
    private formBuilder: FormBuilder,
    private autenticacionService: AutenticacionService
  ) {
    this.formModificarProyecto = this.formBuilder.group({
      cliente: [''],
      nombre: [''],
      descripcion: [''],
      tecnologias: [''],
      fechaInicio: [''],
      fechaFin: [''],
      foto: [''],
    });
    this.formAgregarProyecto = this.formBuilder.group({
      cliente: [''],
      nombre: [''],
      descripcion: [''],
      tecnologias: [''],
      fechaInicio: [''],
      fechaFin: [''],
      foto: [''],
    });
  }

  ngOnInit(): void {
    this.obtenerProyecto();
    this.esUsuarioAutenticado();
  }

  abrirFormularioModificacionProyecto(id: any): void {
    this.modificandoProyectoId = id;
  }

  cerrarFormularioModificacionProyecto(): void {
    this.modificandoProyectoId = false;
  }

  abrirFormularioCrearProyecto(): void {
    this.agregandoProyecto = true;
  }

  cerrarFormularioCrearProyecto(): void {
    this.agregandoProyecto = false;
  }

  agregarProyecto(event: Event): void {
    event.preventDefault;
    this.portfolioService
      .crearProyecto(this.formAgregarProyecto.value)
      .subscribe(() => {
        this.obtenerProyecto();
        this.cerrarFormularioCrearProyecto();
      });
  }

  modificarProyecto(event: Event): void {
    event.preventDefault;
    this.portfolioService
      .modificarProyecto(
        this.modificandoProyectoId,
        this.formModificarProyecto.value
      )
      .subscribe(() => {
        this.obtenerProyecto();
        this.cerrarFormularioModificacionProyecto();
      });
  }

  borrarProyecto(id: number): void {
    this.portfolioService.borrarProyecto(id).subscribe(() => {
      this.obtenerProyecto();
    });
  }

  obtenerProyecto(): void {
    this.portfolioService.obtenerProyecto().subscribe((proyectos) => {
      this.proyectos = proyectos;
    });
  }

  establecerValoresProyecto(proyecto: any) {
    this.formModificarProyecto.patchValue({
      cliente: proyecto.cliente,
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
      tecnologias: proyecto.tecnologias,
      fechaInicio: proyecto.fechaInicio,
      fechaFin: proyecto.fechaFin,
      foto: proyecto.foto,
    });
  }

  esUsuarioAutenticado() {
    this.estaAutenticado = Boolean(
      this.autenticacionService.esUsuarioAutenticado
    );
    console.log(this.estaAutenticado);
  }
}
