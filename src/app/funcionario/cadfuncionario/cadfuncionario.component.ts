import { Funcionario } from "./../model/funcionario";
import { FuncionarioService } from "./../funcionario.service";

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Funcao } from "src/app/funcao/model/funcao";
import { FuncaoService } from "src/app/funcao/funcao.service";
import { LojaService } from "src/app/loja/loja.service";
import { Loja } from "src/app/loja/model/loja";

@Component({
  selector: "app-cadfuncionario",
  templateUrl: "./cadfuncionario.component.html",
  styleUrls: ["./cadfuncionario.component.less"]
})
export class CadfuncionarioComponent implements OnInit {
  formulario: FormGroup;
  funcionario: Funcionario;
  pessoaJuridica = false;
  pessoaFisica = false;
  funcoes: Funcao[];
  lojas: Loja[];
  funcaoSelecionada: Funcao;
  lojaSelecionada: Loja;

  constructor(
    private formBuilder: FormBuilder,
    private funcaoService: FuncaoService,
    private lojaService: LojaService,
    private funcionarioService: FuncionarioService,
    private router: Router,
    private activeRrouter: ActivatedRoute
  ) {}

  ngOnInit() {
    this.carregarComboBox();
    this.funcaoSelecionada = new Funcao();
    this.formulario = this.formBuilder.group({
      idfuncionario: [null],
      nome: [null],
      dataadmissao: [null],
      situacao: [1],
      funcao: [null],
      loja: [null]
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
                nome: [null],
                dataadmissao: [null],
                situacao: [1],
                funcao: [null],
                loja: [null]
              });
            } else {
              this.funcaoSelecionada = this.funcionario.funcao;
              this.formulario = this.formBuilder.group({
                idfuncionario: [this.funcionario.idfuncionario],
                nome: [this.funcionario.nome],
                dataadmissao: [this.funcionario.dataadmissao],
                situacao: [this.funcionario.situacao],
                funcao: [this.funcionario.funcao],
                loja: [this.funcionario.loja]
              });
            }
          },
          err => {
            console.log(err.error.erros.join(" "));
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
  }

  setFuncao() {
    this.funcaoSelecionada = this.formulario.get("funcao").value;
  }

  setLoja() {
    this.lojaSelecionada = this.formulario.get("loja").value;
  }

  compararFuncao(obj1, obj2) {
    return obj1 && obj2 ? obj1.idfuncao === obj2.idfuncao : obj1 === obj2;
  }

  compararLoja(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  salvar() {
    this.funcionario = this.formulario.value;
    console.log(this.funcionario);
    this.funcionarioService.salvar(this.funcionario).subscribe(resposta => {
      this.funcionario = resposta as any;
      console.log(this.funcionario);
    });
    this.router.navigate(["/consfuncionario"]);
  }

  cancelar() {
    this.formulario.reset();
    this.router.navigate(["/consfuncionario"]);
  }
}
