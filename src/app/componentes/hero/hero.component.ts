import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';
import { PortfolioService } from 'src/app/servicios/portfolio.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {
  estaAutenticado: Boolean = false;
  modificandoPersona: Boolean = false;
  formModificarPersona: FormGroup;
  persona: any;

  constructor(
    private portfolioService: PortfolioService,
    private formBuilder: FormBuilder,
    private autenticacionService: AutenticacionService
  ) {
    this.formModificarPersona = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      github: ['', [Validators.required, Validators.minLength(3)]],
      linkedin: ['', [Validators.required, Validators.minLength(3)]],
      info: ['', [Validators.required, Validators.minLength(3)]],
      foto: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit(): void {
    this.obtenerPersona();
    this.esUsuarioAutenticado();
  }

  abrirFormularioModificacionPersona(): void {
    this.modificandoPersona = true;
  }

  cerrarFormularioModificacionPersona(): void {
    this.modificandoPersona = false;
  }

  obtenerPersona(): void {
    this.portfolioService.obtenerPersona().subscribe((persona) => {
      this.persona = persona;
    });
  }

  actualizarInformacionPersona(event: Event): void {
    event.preventDefault;
    if (!this.formModificarPersona.valid) {
      alert('El formulario no es valido');
    } else {
      this.portfolioService
        .modificarPersona(this.formModificarPersona.value)
        .subscribe(() => {
          this.obtenerPersona();
          this.cerrarFormularioModificacionPersona();
        });
    }
  }

  esUsuarioAutenticado() {
    this.estaAutenticado = Boolean(
      this.autenticacionService.esUsuarioAutenticado
    );
    console.log(this.estaAutenticado);
  }

  establecerValoresPersona() {
    this.formModificarPersona.patchValue({
      nombre: this.persona.nombre,
      apellido: this.persona.apellido,
      titulo: this.persona.titulo,
      github: this.persona.github,
      linkedin: this.persona.linkedin,
      info: this.persona.info,
      foto: this.persona.foto,
    });
  }

  valorModificarPersona(campo: String) {
    return this.formModificarPersona.get(`${campo}`);
  }
}
