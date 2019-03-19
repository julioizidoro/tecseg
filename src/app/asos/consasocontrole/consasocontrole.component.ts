import { AsotipoService } from './../asotipo.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Loja } from 'src/app/loja/model/loja';
import { Funcao } from 'src/app/funcao/model/funcao';
import { FuncaoService } from 'src/app/funcao/funcao.service';
import { LojaService } from 'src/app/loja/loja.service';
import { AsocontroleService } from '../asocontrole.service';
import { Asocontrole } from '../model/asocontrole';
import { Asotipo } from '../model/asotipo';
import { now } from 'moment';

@Component({
  selector: 'app-consasocontrole',
  templateUrl: './consasocontrole.component.html',
  styleUrls: ['./consasocontrole.component.less']
})
export class ConsasocontroleComponent implements OnInit {

  formulario: FormGroup;
  lojas: Loja[];
  lojaSelecionada: Loja;
  funcoes: Funcao[];
  funcaoSelecionada: Funcao;
  asoControles: Asocontrole[];
  tipos: Asotipo[];
  tipoSelecionado: Asotipo;
  bt0: boolean;
  bt30: boolean;
  bt45: boolean;
  bt10: boolean;


  constructor(
    private formBuilder: FormBuilder,
    private lojaService: LojaService,
    private funcaoService: FuncaoService,
    private asocontroleService: AsocontroleService,
    private asotipoService: AsotipoService,
  ) {
    this.consultar();
  }

  ngOnInit() {
    this.carregarComboBox();
    this.formulario = this.formBuilder.group({
      nome: [null],
      loja: [null],
      datavencimentoinicial: Date,
      datavencimentofinal: Date,
      funcao: [],
      tipo: [],
    });
  }

  carregarComboBox() {
    this.funcaoService.listar().subscribe(resposta => {
      this.funcoes = resposta as any;
    });
    this.lojaService.listar().subscribe(resposta => {
      this.lojas = resposta as any;
    });
    this.asotipoService.listar().subscribe(resposta => {
      this.tipos = resposta as any;
    });
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

  compararTipo(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setTipo() {
    this.tipoSelecionado = this.formulario.get('tipo').value;
  }

  consultar() {
    this.asocontroleService.listar().subscribe(
      resposta => {
        this.asoControles = resposta as any;
      }
    );
}

pesquisar() {

}

pesquisarLimpar() {
  this.formulario.reset();
  this.funcaoSelecionada = null;
  this.lojaSelecionada = null;
  this.tipoSelecionado = null;
  this.consultar();
}

}
