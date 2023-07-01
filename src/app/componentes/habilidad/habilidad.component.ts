import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-habilidad',
  templateUrl: './habilidad.component.html',
  styleUrls: ['./habilidad.component.css'],
})
export class HabilidadComponent implements OnInit {
  estaAutenticado: Boolean = false;
  agregandoHabilidad: Boolean = false;
  modificandoHabilidadId: any = null;
  formModificarHabilidad: FormGroup;
  formAgregarHabilidad: FormGroup;
  habilidades: any;

  constructor(
    private portfolioService: PortfolioService,
    private formBuilder: FormBuilder,
    private autenticacionService: AutenticacionService
  ) {
    this.formModificarHabilidad = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      porcentaje: [
        '',
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.formAgregarHabilidad = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      porcentaje: [
        '',
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
      descripcion: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.obtenerHabilidad();
    this.esUsuarioAutenticado();
  }

  abrirFormularioModificacionHabilidad(id: any): void {
    this.modificandoHabilidadId = id;
  }

  cerrarFormularioModificacionHabilidad(): void {
    this.modificandoHabilidadId = false;
  }

  abrirFormularioCrearHabilidad(): void {
    this.agregandoHabilidad = true;
  }

  cerrarFormularioCrearHabilidad(): void {
    this.agregandoHabilidad = false;
  }

  agregarHabilidad(event: Event): void {
    event.preventDefault;
    if (!this.formAgregarHabilidad.valid) {
      alert('El formulario no es valido');
    } else {
      this.portfolioService
        .crearHabilidad(this.formAgregarHabilidad.value)
        .subscribe(() => {
          this.obtenerHabilidad();
          this.cerrarFormularioCrearHabilidad();
        });
    }
  }

  modificarHabilidad(event: Event): void {
    event.preventDefault;
    if (!this.formModificarHabilidad.valid) {
      alert('El formulario no es valido');
    } else {
      this.portfolioService
        .modificarHabilidad(
          this.modificandoHabilidadId,
          this.formModificarHabilidad.value
        )
        .subscribe(() => {
          this.obtenerHabilidad();
          this.cerrarFormularioModificacionHabilidad();
        });
    }
  }

  borrarHabilidad(id: number): void {
    if (confirm('Esta seguro que desea borrar esta entrada?')) {
      this.portfolioService.borrarHabilidad(id).subscribe(() => {
        this.obtenerHabilidad();
      });
    }
  }

  obtenerHabilidad(): void {
    this.portfolioService.obtenerHabilidad().subscribe((habilidades) => {
      this.habilidades = habilidades;
    });
  }

  establecerValoresHabilidad(habilidad: any) {
    this.formModificarHabilidad.patchValue({
      nombre: habilidad.nombre,
      porcentaje: habilidad.porcentaje,
      descripcion: habilidad.descripcion,
    });
  }

  esUsuarioAutenticado() {
    this.estaAutenticado = Boolean(
      this.autenticacionService.esUsuarioAutenticado
    );
    console.log(this.estaAutenticado);
  }

  getPorcentaje(habilidad: any) {
    return `radial-gradient(\
      closest-side,\
      var(--onyx) 74%,\
      transparent 75% 100%\
    ),\
    conic-gradient(var(--chartreuse) ${habilidad?.porcentaje}%, #474747 0)`;
  }

  valorAgregarHabilidad(campo: String) {
    return this.formAgregarHabilidad.get(`${campo}`);
  }

  valorModificarHabilidad(campo: String) {
    return this.formModificarHabilidad.get(`${campo}`);
  }
}
