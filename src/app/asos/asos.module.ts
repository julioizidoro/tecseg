import { ListaasofuncionarioComponent } from './listaasofuncionario/listaasofuncionario.component';
import { CadasocontroleComponent } from './cadasocontrole/cadasocontrole.component';
import { AsotipoService } from './asotipo.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsasocontroleComponent } from './consasocontrole/consasocontrole.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FuncaoModule } from '../funcao/funcao.module';
import { routing } from '../app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FuncaoService } from '../funcao/funcao.service';
import { AsocontroleService } from './asocontrole.service';
import { FuncionarioModule } from '../funcionario/funcionario.module';


@NgModule({
  declarations: [
    ConsasocontroleComponent, CadasocontroleComponent, ListaasofuncionarioComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FuncaoModule,
    routing,
    HttpClientModule,
    FuncionarioModule,
  ],
  exports: [
    ConsasocontroleComponent,
    CadasocontroleComponent,
    ListaasofuncionarioComponent,
  ],
  providers: [
    FuncaoService,
    AsocontroleService,
    AsotipoService,
  ]
})
export class AsosModule { }
