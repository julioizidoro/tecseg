import { FuncionarioService } from './../funcionario.service';
import { Funcionario } from './../model/funcionario';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Loja } from 'src/app/loja/model/loja';
import { LojaService } from 'src/app/loja/loja.service';
import { NgModuleCompileResult } from '@angular/compiler/src/ng_module_compiler';
import { stringify } from 'querystring';
import { FuncaoService } from 'src/app/funcao/funcao.service';
import { Funcao } from 'src/app/funcao/model/funcao';

@Component({
  selector: 'app-consfuncionario',
  templateUrl: './consfuncionario.component.html',
  styleUrls: ['./consfuncionario.component.less']
})
export class ConsfuncionarioComponent implements OnInit {

  formulario: FormGroup;
  lojas: Loja[];
  lojaSelecionada: Loja;
  funcoes: Funcao[];
  funcaoSelecionada: Funcao;





  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private lojaService: LojaService,
    private funcaoService: FuncaoService) {
      this.consultar();
    }

    funcionario: Funcionario[];


  ngOnInit() {
    this.carregarComboBox();
    this.formulario = this.formBuilder.group({
      nome: [null],
      loja: [null],
      funcao: [],
    });

  }

  carregarComboBox(){
    this.funcaoService.listar().subscribe(resposta => {
      this.funcoes = resposta as any;
    });
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

  pesquisar() {
    var nomePesquisa = this.formulario.get('nome').value;
    if (nomePesquisa == null ) {
      nomePesquisa ='';
    }
    if (( nomePesquisa.length>0 ) && ( this.funcaoSelecionada==null ) && (this.lojaSelecionada == null)) {
      this.pesquisarNome();
    } else {
        if ( nomePesquisa.length<=0 ) {
          nomePesquisa = "@";
        }
        if (( this.lojaSelecionada!=null) && (this.lojaSelecionada !=null)){
          this.pesquisarFuncionarioFuncaoLoja(nomePesquisa);
        } else {
          if ( this.funcaoSelecionada !=null ){
            this.pesquisarFuncao(nomePesquisa)
          } else {
            if ( this.lojaSelecionada !=null ){
              this.pesquisarLoja(nomePesquisa);
            }
          }
        }
    }
    console.log('teste')
  }

  pesquisarNome() {
    let nomePesquisa = this.formulario.get('nome').value;
    this.funcionarioService.getFuncionarioNome(nomePesquisa).subscribe(
      resposta => {
        this.funcionario = resposta as any;
      }
    );
  }

  pesquisarLoja(nomePesquisa: string){
    this.funcionarioService.getFuncionarioLoja(this.lojaSelecionada.idloja, nomePesquisa).subscribe(
      resposta => {
        this.funcionario = resposta as any;
      }
    );
  }

  pesquisarFuncao(nomePesquisa: string){
    this.funcionarioService.getFuncionarioFuncao(this.funcaoSelecionada.idfuncao, nomePesquisa).subscribe(
      resposta => {
        this.funcionario = resposta as any;
      }
    );
  }

  pesquisarFuncionarioFuncaoLoja(nomePesquisa: string){
    this.funcionarioService.getFuncionarioFuncaoLoja(this.lojaSelecionada.idloja, this.funcaoSelecionada.idfuncao, nomePesquisa ).subscribe(
      resposta => {
        this.funcionario = resposta as any;
      }
    );
  }

  compararLoja(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setLoja() {
    this.lojaSelecionada = this.formulario.get("loja").value;
  }

  compararFuncao(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setFuncao() {
    this.funcaoSelecionada = this.formulario.get("funcao").value;
  }

  pesquisarLimpar() {
    this.formulario.reset();
    this.funcaoSelecionada= null;
    this.lojaSelecionada= null;
    this.consultar();
  }
}
