import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Loja } from 'src/app/loja/model/loja';
import { Funcao } from 'src/app/funcao/model/funcao';
import { FuncaoService } from 'src/app/funcao/funcao.service';
import { LojaService } from 'src/app/loja/loja.service';
import { AsocontroleService } from '../asocontrole.service';
import { Asocontrole } from '../model/asocontrole';

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
  asoControles : Asocontrole[];

  constructor(
    private formBuilder: FormBuilder,
    private lojaService: LojaService,
    private funcaoService: FuncaoService,
    private asocontroleService: AsocontroleService,
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

  consultar() {
    this.asocontroleService.listar().subscribe(
      resposta => {
        this.asoControles = resposta as any;
      }
    );
}

}
