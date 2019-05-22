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
import { getAllDebugNodes } from '@angular/core/src/debug/debug_node';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';

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
  isFirstOpen = true;
  oneAtATime: true;
  bsInlineValue = new Date();


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
    this.formulario.reset();
    this.funcaoSelecionada = null;
    this.lojaSelecionada = null;
    this.tipoSelecionado = null;
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
  const dataI  = this.formulario.get('datavencimentoinicial').value;
  const dataF = this.formulario.get('datavencimentofinal').value;
  let nome = this.formulario.get('nome').value;
  if ((dataI != null) && (dataF != null) && (this.lojaSelecionada != null)
  && (this.funcaoSelecionada != null) && (this.tipoSelecionado != null) ) {
    if (( nome == null) || (nome.length <= 0)) {
      nome = '@';
    }
    this.getAllAsos(dataI, dataF, nome);
  }  else if ((dataI != null) && (dataF != null) &&  (this.funcaoSelecionada != null) ) {
    if (( nome == null) || (nome.length <= 0)) {
      nome = '@';
    }
    this.getDataVencimentoFuncao(dataI, dataF, nome);
  } else if ((dataI != null) && (dataF != null) &&  (this.lojaSelecionada != null) ) {
    if (( nome == null) || (nome.length <= 0)) {
      nome = '@';
    }
    this.getDataVencimentoLoja(dataI, dataF, nome);
  }  else if ((dataI != null) && (dataF != null) &&  (this.tipoSelecionado != null) ) {
    if (( nome == null) || (nome.length <= 0)) {
      nome = '@';
    }
    this.getDataVencimentoTipo(dataI, dataF, nome);
  } else if ((dataI != null) && (dataF != null)) {
    if (( nome == null) || (nome.length <= 0)) {
      nome = '@';
    }
    this.getDataVencimento(dataI, dataF, nome);
  } else if ((this.funcaoSelecionada != null ) && (this.lojaSelecionada != null) ) {
    if (( nome == null) || (nome.length <= 0)) {
      nome = '@';
    }
    this.getFuncaoLoja(nome);
  } else if ((this.lojaSelecionada != null ) && (this.tipoSelecionado != null) ) {
    if (( nome == null) || (nome.length <= 0)) {
      nome = '@';
    }
    this.getLojaTipo(nome);
  } else if ((this.funcaoSelecionada != null ) && (this.tipoSelecionado != null) ) {
    if (( nome == null) || (nome.length <= 0)) {
      nome = '@';
    }
    this.getFuncaoTipo(nome);
  } else if ((this.lojaSelecionada != null ) ) {
    if (( nome == null) || (nome.length <= 0)) {
      nome = '@';
    }
    this.getLoja(nome);
  } else if ((this.funcaoSelecionada != null ) ) {
    if (( nome == null) || (nome.length <= 0)) {
      nome = '@';
    }
    this.getFuncao(nome);
  } else if ((this.tipoSelecionado != null ) ) {
    if (( nome == null) || (nome.length <= 0)) {
      nome = '@';
    }
    this.getTipo(nome);
  } else {
    if (( nome == null) || (nome.length <= 0)) {
      nome = '@';
    }
    this.getNome(nome);
  }
}

getNome(nome: string) {
  this.asocontroleService.getNome(nome).subscribe(
    resposta => {
      this.asoControles = resposta as any;
    }
  );
  this.finalizarPesquisa();
}

getTipo(nome: string) {
  this.asocontroleService.getTipo(nome, this.tipoSelecionado.idasotipo ).subscribe(
    resposta => {
      this.asoControles = resposta as any;
    }
  );
  this.finalizarPesquisa();
}

getFuncao(nome: string) {
  this.asocontroleService.getFuncao(nome, this.lojaSelecionada.idloja ).subscribe(
    resposta => {
      this.asoControles = resposta as any;
    }
  );
  this.finalizarPesquisa();
}

getLoja(nome: string) {
  this.asocontroleService.getLoja(nome, this.lojaSelecionada.idloja ).subscribe(
    resposta => {
      this.asoControles = resposta as any;
    }
  );
  this.finalizarPesquisa();
}

getLojaTipo(nome: string) {
  this.asocontroleService.getLojaTipo(nome, this.lojaSelecionada.idloja, this.tipoSelecionado.idasotipo ).subscribe(
    resposta => {
      this.asoControles = resposta as any;
    }
  );
  this.finalizarPesquisa();
}

getFuncaoTipo(nome: string) {
  this.asocontroleService.getFuncaoTipo(nome, this.funcaoSelecionada.idfuncao, this.tipoSelecionado.idasotipo ).subscribe(
    resposta => {
      this.asoControles = resposta as any;
    }
  );
  this.finalizarPesquisa();
}

getFuncaoLoja(nome: string) {
  this.asocontroleService.getFuncaoLoja(nome, this.funcaoSelecionada.idfuncao, this.lojaSelecionada.idloja ).subscribe(
    resposta => {
      this.asoControles = resposta as any;
    }
  );
  this.finalizarPesquisa();
}

getDataVencimentoFuncao(dataI: Date, dataF: Date, nome: string) {
  this.asocontroleService.getDataVencimentoFuncao(
    dataI, dataF, nome, this.funcaoSelecionada.idfuncao ).subscribe(
    resposta => {
      this.asoControles = resposta as any;
    }
  );
  this.finalizarPesquisa();
}

getDataVencimentoLoja(dataI: Date, dataF: Date, nome: string) {
  this.asocontroleService.getDataVencimentoFuncao(
    dataI, dataF, nome, this.lojaSelecionada.idloja ).subscribe(
    resposta => {
      this.asoControles = resposta as any;
    }
  );
  this.finalizarPesquisa();
}

getDataVencimentoTipo(dataI: Date, dataF: Date, nome: string) {
  this.asocontroleService.getDataVencimentoTipo(
    dataI, dataF, nome, this.tipoSelecionado.idasotipo ).subscribe(
    resposta => {
      this.asoControles = resposta as any;
    }
  );
  this.finalizarPesquisa();
}

getDataVencimento( dataI: Date, dataF: Date, nome: string) {
  this.asocontroleService.getDataVencimento(
    dataI, dataF, nome ).subscribe(
    resposta => {
      this.asoControles = resposta as any;
    }
  );
  this.finalizarPesquisa();
}

getAllAsos( dataI: Date, dataF: Date, nome: string) {
  this.asocontroleService.getAsoControle(
    dataI, dataF, nome, this.lojaSelecionada.idloja, this.funcaoSelecionada.idfuncao, this.tipoSelecionado.idasotipo ).subscribe(
    resposta => {
      this.asoControles = resposta as any;
    }
  );
  this.finalizarPesquisa();
}

finalizarPesquisa() {
  this.formulario.reset();
  this.funcaoSelecionada = null;
  this.lojaSelecionada = null;
  this.tipoSelecionado = null;
}

pesquisarLimpar() {
  this.formulario.reset();
  this.funcaoSelecionada = null;
  this.lojaSelecionada = null;
  this.tipoSelecionado = null;
  this.consultar();
}

gerarImagem(asoImagem: Asocontrole) {

}

}
