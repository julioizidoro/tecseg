import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsasocontroleComponent } from './consasocontrole/consasocontrole.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FuncaoModule } from '../funcao/funcao.module';
import { routing } from '../app.routing';
import { HttpClientModule } from '@angular/common/http';
import { FuncaoService } from '../funcao/funcao.service';
import { AsocontroleService } from './asocontrole.service';


@NgModule({
  declarations: [ConsasocontroleComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FuncaoModule,
    routing,
    HttpClientModule,
  ],
  exports: [
    ConsasocontroleComponent,
  ],
  providers: [
    FuncaoService,
    AsocontroleService,
  ]
})
export class AsosModule { }
