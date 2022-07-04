import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PersonaComponent } from './botones/persona/persona.component';
import { ResumenComponent } from './botones/resumen/resumen.component';
import { SobreMiComponent } from './botones/sobre-mi/sobre-mi.component';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { HabilidadComponent } from './botones/habilidad/habilidad.component';





@NgModule({
  declarations: [
    AppComponent,
    PersonaComponent,
    ResumenComponent,
    SobreMiComponent,
    HabilidadComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AlifeFileToBase64Module
    
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
