import { CadfuncionarioComponent } from './funcionario/cadfuncionario/cadfuncionario.component';
import { ConsfuncionarioComponent } from './funcionario/consfuncionario/consfuncionario.component';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { AppComponent } from './app.component';
import { ConsasocontroleComponent } from './asos/consasocontrole/consasocontrole.component';


const APP_ROUTER: Routes = [
  { path: '', component: AppComponent },
  { path: 'consfuncionario', component: ConsfuncionarioComponent },
  { path: 'cadfuncionario/:id', component: CadfuncionarioComponent },
  { path: 'cadfuncionario', component: CadfuncionarioComponent },
  { path: 'consasocontrole', component: ConsasocontroleComponent },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTER);
