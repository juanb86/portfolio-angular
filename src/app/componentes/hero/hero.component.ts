import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
      nombre: [''],
      apellido: [''],
      titulo: [''],
      github: [''],
      linkedin: [''],
      info: [''],
      foto: [''],
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
    this.portfolioService
      .modificarPersona(this.formModificarPersona.value)
      .subscribe(() => {
        this.obtenerPersona();
        this.cerrarFormularioModificacionPersona();
      });
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
}
