import { AuthService } from './../auth.service';
import { Usuario } from './../../model/usuario';
import { UsuarioService } from './../../usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authSErvice: AuthService
    ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      login: [null],
      senha: [null],
    });
  }

  logar() {
    this.authSErvice.fazerLogin(this.formulario.get('login').value, this.formulario.get('senha').value);
  }

  sair() {

  }
}
