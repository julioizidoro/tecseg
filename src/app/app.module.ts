import { FuncionarioModule } from './funcionario/funcionario.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from './share/share.module';

import {NgxMaskModule} from 'ngx-mask';
import { AsosModule } from './asos/asos.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    ModalModule.forRoot(),
    ShareModule,
    FuncionarioModule,
    NgxMaskModule.forRoot(),
    AsosModule,
    AppRoutingModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
