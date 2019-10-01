import { AuthService } from './usuario/login/auth.service';
import { Usuario } from './usuario/model/usuario';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Acesso } from './usuario/model/acesso';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'TecSeg';
  usuario = new Usuario();

  acesso = new Acesso();


  constructor(
    private authService: AuthService,
    private router: Router
    ) {
      console.log('teste');
    }

    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {
    this.usuario = this.authService.usuario;
    console.log(this.usuario.acesso.aso);
    if ( this.usuario.idusuario == null ) {
        this.router.navigate([ '/login' ]);
    } else {
     console.log(this.usuario.acesso.cadastro);
    }
    this.acesso = this.authService.usuario.acesso;
  }


}


