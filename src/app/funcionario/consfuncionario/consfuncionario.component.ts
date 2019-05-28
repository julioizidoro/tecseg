import { Asotipo } from './../../asos/model/asotipo';
import { FuncionarioService } from './../funcionario.service';
import { Funcionario } from './../model/funcionario';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Loja } from 'src/app/loja/model/loja';
import { LojaService } from 'src/app/loja/loja.service';
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
  habilitarConsulta: false;
  isFirstOpen = true;
  oneAtATime = true;
  bsInlineValue = new Date();
  rotaAnterior: string;






  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router,
    private formBuilder: FormBuilder,
    private lojaService: LojaService,
    private funcaoService: FuncaoService,
    private activeRrouter: ActivatedRoute) {
      this.consultar();
    }

    funcionario: Funcionario[];


  ngOnInit() {
    this.activeRrouter.params.subscribe(params => {
      this.habilitarConsulta = params.habilita;
      this.rotaAnterior = params.rota;
    });
    this.carregarComboBox();
    this.formulario = this.formBuilder.group({
      nome: [null],
      loja: [null],
      funcao: [null],
      situacao: [null],
    });

  }

  carregarComboBox() {
    this.funcaoService.listar().subscribe(resposta => {
      this.funcoes = resposta as any;
    });
    this.lojaService.listar().subscribe(resposta => {
      this.lojas = resposta as any;
    });
  }
    consultar() {
      this.funcionarioService.listar('@', '@').subscribe(
        resposta => {
          this.funcionario = resposta as any;
        }
      );
  }

  editar(funcionario: Funcionario) {
    this.router.navigate([ '/cadfuncionario' ,   funcionario.idfuncionario ]);
  }

  pesquisar() {
    let nomePesquisa = this.formulario.get('nome').value;
    if (nomePesquisa == null) {
      nomePesquisa = '@';
    }
    if ((nomePesquisa.length > 0) && (this.funcaoSelecionada == null) && (this.lojaSelecionada == null)) {
      this.pesquisarNome(nomePesquisa);
    } else if ((this.lojaSelecionada != null) && (this.funcaoSelecionada != null)) {
      this.pesquisarFuncionarioFuncaoLoja(nomePesquisa);
    } else if (this.funcaoSelecionada != null) {
        this.pesquisarFuncao(nomePesquisa);
    } else if (this.lojaSelecionada != null) {
          this.pesquisarLoja(nomePesquisa);
    } else {
      this.pesquisarNome(nomePesquisa);
    }
}

  pesquisarNome(nomePesquisa: string) {
    let situacao = this.formulario.get('situacao').value;
    if (situacao == null) {
      situacao = '@';
    }
    this.funcionarioService.listar(nomePesquisa, situacao).subscribe(
      resposta => {
        this.funcionario = resposta as any;
      }
    );
  }

  pesquisarLoja(nomePesquisa: string) {
    let situacao = this.formulario.get('situacao').value;
    if (situacao == null) {
      situacao = '@';
    }
    this.funcionarioService.getFuncionarioLoja(this.lojaSelecionada.idloja, nomePesquisa, situacao).subscribe(
      resposta => {
        this.funcionario = resposta as any;
      }
    );
  }

  pesquisarFuncao(nomePesquisa: string) {
    let situacao = this.formulario.get('situacao').value;
    if (situacao == null) {
      situacao = '@';
    }
    this.funcionarioService.getFuncionarioFuncao(this.funcaoSelecionada.idfuncao, nomePesquisa, situacao).subscribe(
      resposta => {
        this.funcionario = resposta as any;
      }
    );
  }

  pesquisarFuncionarioFuncaoLoja(nomePesquisa: string) {
    let situacao = this.formulario.get('situacao').value;
    if (situacao == null) {
      situacao = '@';
    }
    this.funcionarioService.getFuncionarioFuncaoLoja(this.lojaSelecionada.idloja,
      this.funcaoSelecionada.idfuncao, nomePesquisa, situacao ).subscribe(
      resposta => {
        this.funcionario = resposta as any;
      }
    );
  }

  compararLoja(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setLoja() {
    this.lojaSelecionada = this.formulario.get('loja').value;
  }

  compararFuncao(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setFuncao() {
    this.funcaoSelecionada = this.formulario.get('funcao').value;
  }

  pesquisarLimpar() {
    this.formulario.reset();
    this.funcaoSelecionada = null;
    this.lojaSelecionada = null;
    this.consultar();
  }

  selecionarFuncionario(funcionarioConsulta: Funcionario) {
    if ( this.rotaAnterior === 'asoagenda') {
      this.router.navigate([ '/cadasoagenda' ,   funcionarioConsulta.idfuncionario, 'consfuncionario' ]);
    } else if ( this.rotaAnterior === 'asocontrole') {
      this.router.navigate([ '/cadasocontrole' ,   funcionarioConsulta.idfuncionario ]);
    }
  }
}
