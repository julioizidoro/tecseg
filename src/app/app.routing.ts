import { ConsasoagendaComponent } from './asoagenda/consasoagenda/consasoagenda.component';
import { CadasocontroleComponent } from './asos/cadasocontrole/cadasocontrole.component';
import { CadfuncionarioComponent } from './funcionario/cadfuncionario/cadfuncionario.component';
import { ConsfuncionarioComponent } from './funcionario/consfuncionario/consfuncionario.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AppComponent } from './app.component';
import { ConsasocontroleComponent } from './asos/consasocontrole/consasocontrole.component';
import { LoginComponent } from './usuario/login/login/login.component';
import { ListaasofuncionarioComponent } from './asos/listaasofuncionario/listaasofuncionario.component';
import { CadasoagendaComponent } from './asoagenda/cadasoagenda/cadasoagenda.component';


const APP_ROUTER: Routes = [
  { path: '', component: AppComponent },
  { path: 'consfuncionario', component: ConsfuncionarioComponent },
  { path: 'consfuncionario/:asos', component: ConsfuncionarioComponent },
  { path: 'cadfuncionario/:id', component: CadfuncionarioComponent },
  { path: 'cadfuncionario', component: CadfuncionarioComponent },
  { path: 'consasocontrole', component: ConsasocontroleComponent },
  { path: 'cadasocontrole/:id', component: CadasocontroleComponent },
  { path: 'listaaso/:id', component: ListaasofuncionarioComponent },
  { path: 'cadasocontrole', component: CadasocontroleComponent },
  { path: 'consasoaagenda', component: ConsasoagendaComponent },
  { path: 'cadasoaagenda', component: CadasoagendaComponent },
  { path: 'cadasoaagenda/:id', component: CadasoagendaComponent },
  { path: 'login', component: LoginComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTER);
