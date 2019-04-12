import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadtreinamentoComponent } from './cadtreinamento/cadtreinamento.component';
import { TreinamentoService } from './treinamento.service';
import { ConstreinamentoComponent } from './constreinamento/constreinamento.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [ConstreinamentoComponent, CadtreinamentoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [
    ConstreinamentoComponent,
  ],
  providers: [
    TreinamentoService
  ],
})
export class TreinamentoModule { }
