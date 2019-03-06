import { FuncionarioService } from './../funcionario.service';
import { Funcionario } from './../model/funcionario';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Loja } from 'src/app/loja/model/loja';
import { LojaService } from 'src/app/loja/loja.service';
import { NgModuleCompileResult } from '@angular/compiler/src/ng_module_compiler';
import { stringify } from 'querystring';

@Component({
  selector: 'app-consfuncionario',
  templateUrl: './consfuncionario.component.html',
  styleUrls: ['./consfuncionario.component.less']
})
export class ConsfuncionarioComponent implements OnInit {

  formulario: FormGroup;
  lojas: Loja[];
  lojaSelecionada: Loja;





  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private lojaService: LojaService) {
      this.consultar();
    }

    funcionario: Funcionario[];


  ngOnInit() {
    this.carregarComboBox();
    this.formulario = this.formBuilder.group({
      nome: [null],
      loja: [null],
    });

  }

  carregarComboBox(){
    this.lojaService.listar().subscribe(resposta => {
      this.lojas = resposta as any;
    });
  }
    consultar() {
      this.funcionarioService.listar().subscribe(
        resposta => {
          this.funcionario = resposta as any;
        }
      );
  }

  editar(funcionario: Funcionario) {
    console.log(funcionario);
    this.router.navigate([ '/cadfuncionario' ,   funcionario.idfuncionario ]);
  }

  pesquisarNome() {
    let nomePesquisa = this.formulario.get('nome').value;
    this.funcionarioService.getFuncionarioNome(nomePesquisa).subscribe(
      resposta => {
        this.funcionario = resposta as any;
        this.formulario.reset();
      }
    );
  }

  compararLoja(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setLoja() {
    this.lojaSelecionada = this.formulario.get("loja").value;
  }

  pesquisarLimpar() {
    this.formulario.reset();
    this.consultar();
  }
}
