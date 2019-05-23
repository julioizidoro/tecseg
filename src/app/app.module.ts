import { ClinicaModule } from './clinica/clinica.module';
import { AsoagendaModule } from './asoagenda/asoagenda.module';
import { CadasoagendaComponent } from './asoagenda/cadasoagenda/cadasoagenda.component';
import { Asoagenda } from './asoagenda/model/asoagenda';
import { TreinamentoModule } from './treinamento/treinamento.module';
import { UsuarioModule } from './usuario/usuario.module';
import { FuncionarioModule } from './funcionario/funcionario.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from './share/share.module';

import {NgxMaskModule} from 'ngx-mask';
import { AsosModule } from './asos/asos.module';
import { AngularValidateBrLibModule } from 'angular-validate-br';




@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ShareModule,
    FuncionarioModule,
    NgxMaskModule.forRoot(),
    AngularValidateBrLibModule,
    AsosModule,
    UsuarioModule,
    ClinicaModule,
    TreinamentoModule,
    AsoagendaModule,
    AppRoutingModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
