import { ClinicaService } from './../../clinica/clinica.service';
import { Clinica } from './../../clinica/model/clinica';
import { AsoagendaService } from './../asoagenda.service';
import { Asoagenda } from './../model/asoagenda';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Asotipo } from 'src/app/asos/model/asotipo';
import { Asocontrole } from 'src/app/asos/model/asocontrole';
import { Funcao } from 'src/app/funcao/model/funcao';
import { Funcionario } from 'src/app/funcionario/model/funcionario';
import { FuncionarioService } from 'src/app/funcionario/funcionario.service';
import { AsotipoService } from 'src/app/asos/asotipo.service';
import { FuncaoService } from 'src/app/funcao/funcao.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AsocontroleService } from 'src/app/asos/asocontrole.service';
import { Loja } from 'src/app/loja/model/loja';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cadasoagenda',
  templateUrl: './cadasoagenda.component.html',
  styleUrls: ['./cadasoagenda.component.less']
})
export class CadasoagendaComponent implements OnInit {

  formulario: FormGroup;
  tipos: Asotipo[];
  tipoSelecionado: Asotipo;
  asoControles: Asocontrole;
  funcoes: Funcao[];
  funcaoSelecionada: Funcao;
  funcionarioSelecionado: Funcionario;
  asoAgenda: Asoagenda;
  clinicaSelecionada: Clinica;
  clinicas: Clinica[];
  enabledFuncao = false;
  public maskHora = [/[0-9]/, /[0-9]/, ':', /[0-9]/, /[0-9]/];
  rotaConsulta: string;
  inscricao: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService,
    private asotipoService: AsotipoService,
    private funcaoService: FuncaoService,
    private router: Router,
    private activeRrouter: ActivatedRoute,
    private asocontroleService: AsocontroleService,
    private asoagendaService: AsoagendaService,
    private clinicaService: ClinicaService,
  ) { }

  ngOnInit() {
    this.funcionarioSelecionado = new Funcionario();
    this.funcionarioSelecionado.funcao = new Funcao();
    this.funcionarioSelecionado.funcao.nome = 'Função';
    this.funcionarioSelecionado.nome = 'Nome do funcioário';
    this.funcaoSelecionada = new Funcao();
    this.funcaoSelecionada.nome = 'Função';
    this.funcionarioSelecionado.loja = new Loja();
    this.funcionarioSelecionado.loja.nome = 'Loja';
    this.carregarComboBox();
    this.formulario = this.formBuilder.group({
      idasoagenda: [null],
      dataexame: [null],
      hora: [null],
      situacao: [null],
      funcionario: [null],
      asotipo: [null],
      funcao: [null],
      clinica: [null],
    });

    let id;
    this.inscricao = this.activeRrouter.params.subscribe(params => {
      id = params.id;
      if (id != null) {
        this.funcionarioService.getFuncionarioId(id).subscribe(
          resposta => {
            this.funcionarioSelecionado = resposta as Funcionario;
            this.formulario = this.formBuilder.group({
              idasoagenda: [null],
              dataexame: [null],
              hora: [null],
              situacao: [null],
              funcionario: this.funcionarioSelecionado,
              asotipo: [null],
              funcao: this.funcionarioSelecionado.funcao,
              clinica: this.clinicaSelecionada,
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
    this.clinicaService.listar().subscribe(resposta => {
      this.clinicas = resposta as any;
      if ( this.clinicas.length === 1) {
        this.clinicaSelecionada = this.clinicas[0];
      }
    });
  }

  compararTipo(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setTipo() {
    this.tipoSelecionado = this.formulario.get('asotipo').value;
    if ( this.tipoSelecionado.idasotipo === 3 ) {
      this.enabledFuncao = true;
    } else {
      this.enabledFuncao = false;
    }
  }

  setFuncao() {
    this.funcaoSelecionada = this.formulario.get('funcao').value;
  }

  compararFuncao(obj1, obj2) {
    return obj1 && obj2 ? obj1.idfuncao === obj2.idfuncao : obj1 === obj2;
  }

  setClinica() {
    this.clinicaSelecionada = this.formulario.get('clinica').value;
  }

  compararClinica(obj1, obj2) {
    return obj1 && obj2 ? obj1.idclinica === obj2.idclinica : obj1 === obj2;
  }

  consultaFuncionario() {
    this.router.navigate(['/consfuncionario'] ,  { queryParams: {habilitarConsulta: true, rota: 'asoagenda' }});
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  salvar() {

  }

  cancelar() {

  }


}
