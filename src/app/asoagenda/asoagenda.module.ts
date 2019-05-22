import { LojaService } from 'src/app/loja/loja.service';
import { FuncionarioService } from './../funcionario/funcionario.service';
import { CadasoagendaComponent } from './cadasoagenda/cadasoagenda.component';
import { ConsasoagendaComponent } from './consasoagenda/consasoagenda.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from '../app.routing';
import { HttpClientModule } from '@angular/common/http';
import { AsoagendaService } from './asoagenda.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FuncaoService } from '../funcao/funcao.service';
import { AsotipoService } from '../asos/asotipo.service';
import { AccordionModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    ConsasoagendaComponent,
    CadasoagendaComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    routing,
    HttpClientModule,
    AccordionModule.forRoot(),
  ],
  exports: [
    ConsasoagendaComponent,
    CadasoagendaComponent,
  ],
  providers: [
    AsoagendaService,
    FuncaoService,
    AsotipoService,
    FuncionarioService,
    LojaService,
  ]
})
export class AsoagendaModule { }
