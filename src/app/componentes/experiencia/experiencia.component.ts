import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
})
export class ExperienciaComponent implements OnInit {
  estaAutenticado: Boolean = false;
  agregandoExperiencia: Boolean = false;
  modificandoExperienciaId: any = null;
  formModificarExperiencia: FormGroup;
  formAgregarExperiencia: FormGroup;
  experiencias: any;

  constructor(
    private portfolioService: PortfolioService,
    private formBuilder: FormBuilder,
    private autenticacionService: AutenticacionService
  ) {
    this.formModificarExperiencia = this.formBuilder.group({
      cliente: ['', [Validators.required, Validators.minLength(3)]],
      ocupacion: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      tecnologias: ['', [Validators.required, Validators.minLength(3)]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: [''],
    });
    this.formAgregarExperiencia = this.formBuilder.group({
      cliente: ['', [Validators.required, Validators.minLength(3)]],
      ocupacion: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
      tecnologias: ['', [Validators.required, Validators.minLength(3)]],
      fechaInicio: ['', [Validators.required]],
      fechaFin: [''],
    });
  }

  ngOnInit(): void {
    this.obtenerExperiencia();
    this.esUsuarioAutenticado();
  }

  abrirFormularioModificacionExperiencia(id: any): void {
    this.modificandoExperienciaId = id;
  }

  cerrarFormularioModificacionExperiencia(): void {
    this.modificandoExperienciaId = false;
  }

  abrirFormularioCrearExperiencia(): void {
    this.agregandoExperiencia = true;
  }

  cerrarFormularioCrearExperiencia(): void {
    this.agregandoExperiencia = false;
  }

  agregarExperiencia(event: Event): void {
    event.preventDefault;
    if (!this.formAgregarExperiencia.valid) {
      alert('El formulario no es valido');
    } else {
      this.portfolioService
        .crearExperiencia(this.formAgregarExperiencia.value)
        .subscribe(() => {
          this.obtenerExperiencia();
          this.cerrarFormularioCrearExperiencia();
        });
    }
  }

  modificarExperiencia(event: Event): void {
    event.preventDefault;
    if (!this.formModificarExperiencia.valid) {
      alert('El formulario no es valido');
    } else {
      this.portfolioService
        .modificarExperiencia(
          this.modificandoExperienciaId,
          this.formModificarExperiencia.value
        )
        .subscribe(() => {
          this.obtenerExperiencia();
          this.cerrarFormularioModificacionExperiencia();
        });
    }
  }

  borrarExperiencia(id: number): void {
    if (confirm('Esta seguro que desea borrar esta entrada?')) {
      this.portfolioService.borrarExperiencia(id).subscribe(() => {
        this.obtenerExperiencia();
      });
    }
  }

  obtenerExperiencia(): void {
    this.portfolioService.obtenerExperiencia().subscribe((experiencias) => {
      this.experiencias = experiencias;
    });
  }

  establecerValoresExperiencia(experiencia: any) {
    this.formModificarExperiencia.patchValue({
      cliente: experiencia.cliente,
      ocupacion: experiencia.ocupacion,
      descripcion: experiencia.descripcion,
      tecnologias: experiencia.tecnologias,
      fechaInicio: experiencia.fechaInicio,
      fechaFin: experiencia.fechaFin,
    });
  }

  esUsuarioAutenticado() {
    this.estaAutenticado = Boolean(
      this.autenticacionService.esUsuarioAutenticado
    );
    console.log(this.estaAutenticado);
  }

  valorAgregarExperiencia(campo: String) {
    return this.formAgregarExperiencia.get(`${campo}`);
  }

  valorModificarExperiencia(campo: String) {
    return this.formModificarExperiencia.get(`${campo}`);
  }
}
