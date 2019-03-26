import { AsocontroleService } from './../asocontrole.service';
import { Funcionario } from 'src/app/funcionario/model/funcionario';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FuncionarioService } from 'src/app/funcionario/funcionario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AsotipoService } from '../asotipo.service';
import { Asotipo } from '../model/asotipo';
import { Asocontrole } from '../model/asocontrole';
import * as moment from 'moment';
import { Funcao } from 'src/app/funcao/model/funcao';
import { FuncaoService } from 'src/app/funcao/funcao.service';


@Component({
  selector: 'app-cadasocontrole',
  templateUrl: './cadasocontrole.component.html',
  styleUrls: ['./cadasocontrole.component.less']
})
export class CadasocontroleComponent implements OnInit {

  formularioAsoControle: FormGroup;
  tipos: Asotipo[];
  tipoSelecionado: Asotipo;
  asoControles: Asocontrole;
  lastAsoControles: Asocontrole;
  funcoes: Funcao[];
  funcaoSelecionada: Funcao;
  funcionarioSelecionado: Funcionario;

  constructor(
    private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService,
    private asotipoService: AsotipoService,
    private funcaoService: FuncaoService,
    private router: Router,
    private activeRrouter: ActivatedRoute,
    private asocontroleService: AsocontroleService
  ) { }

  ngOnInit() {
    this.funcionarioSelecionado = new Funcionario();
    this.carregarComboBox();
    this.funcaoSelecionada = new Funcao();
    this.formularioAsoControle = this.formBuilder.group({
      idasocontrole: [null],
      dataexame: [null],
      datavencimento: [null],
      finalizado: [null],
      observacao: [null],
      exame: [null],
      asotipo: [null],
      funcionario: [null],
      funcao: [null],
    });

    let id;
    this.activeRrouter.params.subscribe(params => {
      id = params.id;
      if (id != null) {
        this.funcionarioService.getFuncionarioId(id).subscribe(
          resposta => {
            this.funcionarioSelecionado = resposta as Funcionario;
            this.funcaoSelecionada = this.funcionarioSelecionado.funcao;
            this.formularioAsoControle = this.formBuilder.group({
              idasocontrole: [null],
              dataexame: [null],
              datavencimento: [null],
              finalizado: [null],
              observacao: [null],
              exame: [null],
              asotipo: [null],
              funcionario: [null],
              funcao: this.funcaoSelecionada,
            });
          },
          err => {
            console.log(err.error.erros.join(' '));
          }
        );
      }
    });

  }

  carregarComboBox() {
    this.asotipoService.listar().subscribe(resposta => {
      this.tipos = resposta as any;
    });
    this.funcaoService.listar().subscribe(resposta => {
      this.funcoes = resposta as any;
    });
  }

  compararTipo(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setTipo() {
    this.calcularDataVencimento();
  }

  salvar() {
    this.asoControles = this.formularioAsoControle.value;
    this.asoControles.funcionario = this.funcionarioSelecionado;
    this.asoControles.funcionario.funcao = this.funcaoSelecionada;
    this.asocontroleService.getLast(this.asoControles.funcionario.idfuncionario).subscribe(resposta => {
      this.lastAsoControles = resposta as any;
      console.log(this.asoControles);
      this.asocontroleService.salvar(this.asoControles).subscribe(resposta => {
        this.asoControles = resposta as any;
        console.log(this.asoControles);

        if ( this.lastAsoControles !=null ) {
          this.lastAsoControles.finalizado = true;
          this.asocontroleService.salvar(this.lastAsoControles).subscribe(resposta => {
            this.asoControles = resposta as any;
            console.log(this.asoControles);
          });
        }
      });
      this.router.navigate(['/consasocontrole']);
    },
    err => {
      console.log(err.error.erros.join(' '));
    }
    );


  }

  cancelar() {
    this.router.navigate(['/consasocontrole']);
  }

  calcularDataVencimento()  {
    this.tipoSelecionado = this.formularioAsoControle.get('asotipo').value;

    let dataVencimento = this.formularioAsoControle.get('dataexame').value;
    let dias = this.tipoSelecionado.periodicidade;

    this.asocontroleService.calcularVencimento(dataVencimento, dias).subscribe(resposta => {
      dataVencimento = resposta as any;
      dataVencimento = moment(dataVencimento).format('YYYY-MM-DD');
      console.log(dataVencimento);
      this.formularioAsoControle.patchValue({
        datavencimento: dataVencimento
    });
    },
    err=>
    {
      console.log(err.error.erros.join(' '));
    }
    );

  }

  setFuncao() {
    this.funcaoSelecionada = this.formularioAsoControle.get('funcao').value;
  }

  compararFuncao(obj1, obj2) {
    return obj1 && obj2 ? obj1.idfuncao === obj2.idfuncao : obj1 === obj2;
  }


}
