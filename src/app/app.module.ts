import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './componentes/encabezado/encabezado.component';
import { HeroComponent } from './componentes/hero/hero.component';
import { AcercaDeComponent } from './componentes/acerca-de/acerca-de.component';

import { HttpClientModule } from '@angular/common/http';
import { ProyectosComponent } from './componentes/proyectos/proyectos.component';

@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    HeroComponent,
    AcercaDeComponent,
    ProyectosComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
