import { FuncaoService } from 'src/app/funcao/funcao.service';
import { FuncaoModule } from './../funcao/funcao.module';
import { FuncionarioService } from './funcionario.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsfuncionarioComponent } from './consfuncionario/consfuncionario.component';
import { CadfuncionarioComponent } from './cadfuncionario/cadfuncionario.component';
import { routing } from '../app.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { AccordionModule } from 'ngx-bootstrap';
import { TextMaskModule } from 'angular2-text-mask';



@NgModule({
  declarations: [ConsfuncionarioComponent, CadfuncionarioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccordionModule.forRoot(),
    FuncaoModule,
    routing,
    HttpClientModule,
    TextMaskModule,
  ],
  exports: [
    ConsfuncionarioComponent,
    CadfuncionarioComponent,
  ],
  providers: [
    FuncionarioService,
    FuncaoService,
  ]

})
export class FuncionarioModule { }
