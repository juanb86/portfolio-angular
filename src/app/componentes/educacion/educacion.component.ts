import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css'],
})
export class EducacionComponent implements OnInit {
  estaAutenticado: Boolean = false;
  agregandoEducacion: Boolean = false;
  modificandoEducacionId: any = null;
  formModificarEducacion: FormGroup;
  formAgregarEducacion: FormGroup;
  educaciones: any;

  constructor(
    private portfolioService: PortfolioService,
    private formBuilder: FormBuilder,
    private autenticacionService: AutenticacionService
  ) {
    this.formModificarEducacion = this.formBuilder.group({
      institucion: [''],
      titulo: [''],
      especialidad: [''],
      fechaInicio: [''],
      fechaFin: [''],
      descripcion: [''],
    });
    this.formAgregarEducacion = this.formBuilder.group({
      institucion: [''],
      titulo: [''],
      especialidad: [''],
      fechaInicio: [''],
      fechaFin: [''],
      descripcion: [''],
    });
  }

  ngOnInit(): void {
    this.obtenerEducacion();
    this.esUsuarioAutenticado();
  }

  abrirFormularioModificacionEducacion(id: any): void {
    this.modificandoEducacionId = id;
  }

  cerrarFormularioModificacionEducacion(): void {
    this.modificandoEducacionId = false;
  }

  abrirFormularioCrearEducacion(): void {
    this.agregandoEducacion = true;
  }

  cerrarFormularioCrearEducacion(): void {
    this.agregandoEducacion = false;
  }

  agregarEducacion(event: Event): void {
    event.preventDefault;
    this.portfolioService
      .crearEducacion(this.formAgregarEducacion.value)
      .subscribe(() => {
        this.obtenerEducacion();
        this.cerrarFormularioCrearEducacion();
      });
  }

  modificarEducacion(event: Event): void {
    event.preventDefault;
    this.portfolioService
      .modificarEducacion(
        this.modificandoEducacionId,
        this.formModificarEducacion.value
      )
      .subscribe(() => {
        this.obtenerEducacion();
        this.cerrarFormularioModificacionEducacion();
      });
  }

  borrarEducacion(id: number): void {
    this.portfolioService.borrarEducacion(id).subscribe(() => {
      this.obtenerEducacion();
    });
  }

  obtenerEducacion(): void {
    this.portfolioService.obtenerEducacion().subscribe((educaciones) => {
      this.educaciones = educaciones;
    });
  }

  establecerValoresEducacion(educacion: any) {
    this.formModificarEducacion.patchValue({
      institucion: educacion.institucion,
      titulo: educacion.titulo,
      especialidad: educacion.especialidad,
      fechaInicio: educacion.fechaInicio,
      fechaFin: educacion.fechaFin,
      descripcion: educacion.descripcion,
    });
  }

  esUsuarioAutenticado() {
    this.estaAutenticado = Boolean(
      this.autenticacionService.esUsuarioAutenticado
    );
    console.log(this.estaAutenticado);
  }
}
