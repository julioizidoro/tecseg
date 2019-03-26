import { routing } from './app.routing';
import { CadasocontroleComponent } from './asos/cadasocontrole/cadasocontrole.component';
import { CadfuncionarioComponent } from './funcionario/cadfuncionario/cadfuncionario.component';
import { ConsfuncionarioComponent } from './funcionario/consfuncionario/consfuncionario.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AppComponent } from './app.component';
import { ConsasocontroleComponent } from './asos/consasocontrole/consasocontrole.component';
import { LoginComponent } from './usuario/login/login/login.component';
import { ListaasofuncionarioComponent } from './asos/listaasofuncionario/listaasofuncionario.component';
import { NgModule } from '@angular/core';


const APP_ROUTER: Routes = [
  { path: '', component: AppComponent },
  { path: 'consfuncionario', component: ConsfuncionarioComponent },
  { path: 'cadfuncionario/:id', component: CadfuncionarioComponent },
  { path: 'cadfuncionario', component: CadfuncionarioComponent },
  { path: 'consasocontrole', component: ConsasocontroleComponent },
  { path: 'cadasocontrole/:id', component: CadasocontroleComponent },
  { path: 'listaaso/:id', component: ListaasofuncionarioComponent },
  { path: 'cadasocontrole', component: CadasocontroleComponent },
  { path: 'login', component: LoginComponent },
];




@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTER)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
