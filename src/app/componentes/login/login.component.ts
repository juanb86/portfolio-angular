import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { AutenticacionService } from 'src/app/servicios/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private autenticacionService: AutenticacionService,
    private ruta: Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  get Email() {
    return this.form.get('email');
  }

  get Password() {
    return this.form.get('password');
  }

  onEnviar(event: Event) {
    event.preventDefault;
    this.autenticacionService
      .IniciarSesion(this.form.value)
      .pipe(
        catchError((error) => {
          console.log(error);
          if (error.status === 401) {
            this.errorMessage = 'Email o Contraseña incorrectos';
          } else {
            this.errorMessage = 'Ha ocurrido un error';
          }
          return of(null);
        })
      )
      .subscribe((data) => {
        if (data) {
          console.log('Login Enviar');
          console.log(data);
          this.ruta.navigate(['/']);
        }
      });
  }
}
