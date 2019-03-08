import { Funcionario } from 'src/app/funcionario/model/funcionario';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FuncionarioService } from 'src/app/funcionario/funcionario.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AsotipoService } from '../asotipo.service';
import { Asotipo } from '../model/asotipo';
import { Asocontrole } from '../model/asocontrole';

@Component({
  selector: 'app-cadasocontrole',
  templateUrl: './cadasocontrole.component.html',
  styleUrls: ['./cadasocontrole.component.less']
})
export class CadasocontroleComponent implements OnInit {

  formulario: FormGroup;
  tipos: Asotipo[];
  tipoSelecionado: Asotipo;
  asoControles: Asocontrole;
  funcionarioSelecionado: Funcionario;

  constructor(
    private formBuilder: FormBuilder,
    private funcionarioService: FuncionarioService,
    private asotipoService: AsotipoService,
    private router: Router,
    private activeRrouter: ActivatedRoute
  ) { }

  ngOnInit() {
    this.carregarComboBox();
    this.formulario = this.formBuilder.group({
      idasocontrole: [null],
      dataexame: [null],
      datavencimento: [null],
      finalizado: [null],
      observacao: [null],
      exame: [null],
      asotipo: [null],
      usuario: [null],
      funcionario: [null],
    });
  }

  carregarComboBox() {
    this.asotipoService.listar().subscribe(resposta => {
      this.tipos = resposta as any;
    });
  }

  compararTipo(obj1, obj2) {
    return obj1 && obj2 ? obj1.idloja === obj2.idloja : obj1 === obj2;
  }

  setTipo() {
    this.tipoSelecionado = this.formulario.get('tipo').value;
  }

  salvar() {

  }

  cancelar() {

  }

}
