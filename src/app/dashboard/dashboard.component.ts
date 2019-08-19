import { Usuario } from './../usuario/model/usuario';
import { Component, OnInit } from '@angular/core';
import { Acesso } from '../usuario/model/acesso';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {

  usuario: Usuario;

  constructor() { 
    this.usuario = new Usuario();
    this.usuario.acesso = new Acesso();
    this.usuario.acesso.cadastro = true;
  }

  ngOnInit() {
  }

}
