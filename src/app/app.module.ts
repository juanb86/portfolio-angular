import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroComponent } from './componentes/hero/hero.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { LoginComponent } from './componentes/login/login.component';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { PortfolioService } from './servicios/portfolio.service';
import { InterceptorService } from './servicios/interceptor.service';
import { HabilidadComponent } from './componentes/habilidad/habilidad.component';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    ProyectosComponent,
    NavbarComponent,
    EducacionComponent,
    LoginComponent,
    PortfolioComponent,
    HabilidadComponent,
    ExperienciaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    PortfolioService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
