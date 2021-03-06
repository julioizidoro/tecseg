import { Validacoes } from './../../campo-control-erro/validacoes';
import { SetorService } from './../../setor/setor.service';
import { Asocontrole } from './../../asos/model/asocontrole';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Funcionario } from '../model/funcionario';
import { Funcao } from 'src/app/funcao/model/funcao';
import { Loja } from 'src/app/loja/model/loja';
import { FuncaoService } from 'src/app/funcao/funcao.service';
import { LojaService } from 'src/app/loja/loja.service';
import { FuncionarioService } from '../funcionario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Setor } from 'src/app/setor/model/setor';
import { ValidateBrService } from 'angular-validate-br';






@Component({
  selector: 'app-cadfuncionario',
  templateUrl: './cadfuncionario.component.html',
  styleUrls: ['./cadfuncionario.component.less']
})
export class CadfuncionarioComponent implements OnInit {
  formulario: FormGroup;
  funcionario: Funcionario;
  pessoaJuridica = false;
  pessoaFisica = false;
  funcoes: Funcao[];
  lojas: Loja[];
  setores: Setor[];
  funcaoSelecionada: Funcao;
  lojaSelecionada: Loja;
  setorSelecionado: Setor;
  validateBrService: ValidateBrService;
  public maskCPF = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
  public maskPIS = [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '.' , /[0-9]/, /[0-9]/, '.', /[0-9]/];

  constructor(
    private formBuilder: FormBuilder,
    private funcaoService: FuncaoService,
    private lojaService: LojaService,
    private setorService: SetorService,
    private funcionarioService: FuncionarioService,
    private router: Router,
    private activeRrouter: ActivatedRoute

  ) {}

  ngOnInit() {
    this.setorSelecionado = new Setor();
    this.setorSelecionado.idsetor = 1;
    this.setorSelecionado.nome = 'Não cadastrado';
    this.carregarComboBox();
    this.funcaoSelecionada = new Funcao();
    this.funcaoSelecionada.cbo = '';
    this.formulario = this.formBuilder.group({
      idfuncionario: [null],
      nome: [null, Validators.required],
      dataadmissao: [null, Validators.required],
      situacao: ['Ativo', Validators.required],
      funcao: [null, Validators.required],
      loja: [null, Validators.required],
      cpf: ['',   [ Validators.required, Validacoes.ValidaCpf]],
      rg: [null],
      uf: [null],
      datanascimento: [null],
      pis: [null],
      ctps: [null],
      serie: [null],
      setor: [this.setorSelecionado, Validators.required],
    });
    let id;
    this.activeRrouter.params.subscribe(params => {
      id = params.id;
      if (id != null) {
        this.funcionarioService.getFuncionarioId(id).subscribe(
          resposta => {
            this.funcionario = resposta as Funcionario;
            if (this.funcionario == null) {
              this.funcaoSelecionada = new Funcao();
              this.formulario = this.formBuilder.group({
                idfuncionario: [null],
                nome: [null, Validators.required],
                dataadmissao: [null, Validators.required],
                situacao: ['Ativo', Validators.required],
                funcao: [null, Validators.required],
                loja: [null, Validators.required],
                cpf: ['',  [ Validators.required, Validacoes.ValidaCpf]],
                rg: [null],
                uf: [null],
                datanascimento: [null],
                pis: [null],
                ctps: [null],
                serie: [null],
                setor: [null, Validators.required],
              });
            } else {
              this.funcaoSelecionada = this.funcionario.funcao;
              this.setorSelecionado = this.funcionario.setor;
              this.formulario = this.formBuilder.group({
                idfuncionario: [this.funcionario.idfuncionario],
                nome: [this.funcionario.nome, Validators.required],
                dataadmissao: [this.funcionario.dataadmissao, Validators.required],
                situacao: [this.funcionario.situacao, Validators.required],
                funcao: [this.funcionario.funcao, Validators.required],
                loja: [this.funcionario.loja, Validators.required],
                cpf: [this.funcionario.cpf,   [ Validators.required, Validacoes.ValidaCpf]],
                rg: [this.funcionario.rg],
                uf: [this.funcionario.uf],
                datanascimento: [this.funcionario.datanascimento],
                pis: [this.funcionario.pis],
                ctps: [this.funcionario.ctps],
                serie: [this.funcionario.serie],
                setor: [this.funcionario.setor, Validators.required]
              });
            }
          },
          err => {
            console.log(err.error.erros.join(' '));
          }
        );
      }
    });
  }

  carregarComboBox() {
    this.funcaoService.listar().subscribe(resposta => {
      this.funcoes = resposta as any;
    });
    this.lojaService.listar().subscribe(resposta => {
      this.lojas = resposta as any;
    });
    this.setorService.listar().subscribe(resposta => {
      this.setores = resposta as any;
    });
  }

  setFuncao() {
    this.funcaoSelecionada = this.formulario.get('funcao').value;
  }

  setLoja() {
    this.lojaSelecionada = this.formulario.get('loja').value;
  }

  setSetor() {
    this.setorSelecionado = this.formulario.get('setor').value;
  }

  compararFuncao(obj1, obj2) {
    return obj1 && obj2 ? obj1.idfuncao === obj2.idfuncao : obj1 === obj2;
  }

  compararLoja(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  compararSetor(obj1, obj2) {
    return obj1 && obj2 ? obj1.idsetor === obj2.idSetor : obj1 === obj2;
  }

  salvar() {
    this.funcionario = this.formulario.value;
    console.log(this.funcionario);
    if (this.funcionario.idfuncionario == null) {
      this.funcionarioService.salvar(this.funcionario).subscribe(resposta => {
        this.funcionario = resposta as any;
      });
    } else {
      this.funcionarioService.atualizar(this.funcionario).subscribe(resposta => {
        this.funcionario = resposta as any;
      });
    }
    console.log(this.funcionario);
    this.formulario.reset();
    this.router.navigate(['/consfuncionario']);
  }

  cancelar() {
    this.formulario.reset();
    this.router.navigate(['/consfuncionario']);
  }

  verificarValidTouched(campo) {
    return (!this.formulario.get(campo).valid && this.formulario.get(campo).touched);
  }

  aplicaCssErro(campo) {
    return {
      'has-error' : this.verificarValidTouched(campo),
      'has-feedback' : this.verificarValidTouched(campo)
    };
  }

  consultarCPF() {
    const cpf = this.formulario.get('cpf').value;
    let funcionarioCPF: Funcionario;
    this.funcionarioService.getFuncionarioCPF(cpf).subscribe(resposta => {
      funcionarioCPF = resposta as Funcionario;
      if (funcionarioCPF != null) {
        alert('Cliente já cadastrado: ' + funcionarioCPF.nome);
      }
    });
  }
}
