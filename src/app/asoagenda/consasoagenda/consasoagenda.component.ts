import { Asoagenda } from './../model/asoagenda';
import { AsoagendaService } from './../asoagenda.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Funcao } from 'src/app/funcao/model/funcao';
import { Asotipo } from 'src/app/asos/model/asotipo';
import { AsotipoService } from 'src/app/asos/asotipo.service';
import { FuncaoService } from 'src/app/funcao/funcao.service';
import { LojaService } from 'src/app/loja/loja.service';
import { Loja } from 'src/app/loja/model/loja';
import { Router } from '@angular/router';


@Component({
  selector: 'app-consasoagenda',
  templateUrl: './consasoagenda.component.html',
  styleUrls: ['./consasoagenda.component.less']
})
export class ConsasoagendaComponent implements OnInit {

  formulario: FormGroup;
  isFirstOpen = false;
  oneAtATime: true;
  lojas: Loja[];
  lojaSelecionada: Loja;
  asoAgendas: Asoagenda[];

  constructor(
    private formBuilder: FormBuilder,
    private funcaoService: FuncaoService,
    private router: Router,
    private asotipoService: AsotipoService,
    private lojaService: LojaService,
    private asoagendaService: AsoagendaService,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null],
      loja: [null],
      situacao: [null],
    });
    this.carregarComboBox();
    this.formulario.reset();
    this.consultar();
  }

  carregarComboBox() {
    this.lojaService.listar().subscribe(resposta => {
      this.lojas = resposta as any;
    });
  }

  compararLoja(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setLoja() {
    this.lojaSelecionada = this.formulario.get('loja').value;
  }

  consultar() {
    this.asoagendaService.listar().subscribe(
      resposta => {
        this.asoAgendas = resposta as any;
      }
    );
  }

  pesquisarLimpar() {
    this.formulario.reset();
    this.lojaSelecionada = null;
    this.consultar();
  }

  pesquisar() {
    let nomePesquisa = this.formulario.get('nome').value;
    const situacao = this.formulario.get('situacao').value;
    if (nomePesquisa == null) {
      nomePesquisa = '@';
    }
    if ((this.lojaSelecionada != null) && (situacao != null)) {
      this.pesquisarAll( this.lojaSelecionada.idloja, nomePesquisa, situacao);
    } else if (this.lojaSelecionada != null) {
      this.pesquisarLoja(this.lojaSelecionada.idloja, nomePesquisa);
    } else if (situacao != null) {
      this.pesquisarSituacao(situacao, nomePesquisa);
    } else {
      this.pesquisarNome(nomePesquisa);
    }
  }

pesquisarNome( nomePesquisa: string ) {
  this.asoagendaService.pesquisarNome( nomePesquisa ).subscribe(
    resposta => {
      this.asoAgendas = resposta as any;
    }
  );
}

pesquisarLoja( idLoja: number, nomePesquisa: string) {
  this.asoagendaService.pesquisarLoja( idLoja, nomePesquisa ).subscribe(
    resposta => {
      this.asoAgendas = resposta as any;
    }
  );
}

pesquisarSituacao( situacao: string, nomePesquisa: string) {
  this.asoagendaService.pesquisarSituacao( situacao, nomePesquisa ).subscribe(
    resposta => {
      this.asoAgendas = resposta as any;
    }
  );
}

pesquisarAll( idLoja: number, nomePesquisa: string, situacao: string) {
  this.asoagendaService.pesquisar( idLoja, nomePesquisa, situacao ).subscribe(
    resposta => {
      this.asoAgendas = resposta as any;
    }
  );
}

novo() {
  this.router.navigate([ '/cadasoagenda', 'asoagenda']);
}

editar(asoAgenda: Asoagenda) {
  this.router.navigate([ '/cadasoagenda' ,   asoAgenda.idasoagenda, 'asoagenda' ]);
}

}

