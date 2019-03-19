import { ExpressionStatement } from '@angular/compiler';
import { Funcionario } from 'src/app/funcionario/model/funcionario';
import { Exame } from './exame';
import { Asotipo } from './asotipo';
import { Usuario } from 'src/app/usuario/model/usuario';

export class Asocontrole {
    idasocontrole: number;
    dataexame: Date;
    datavencimento: Date;
    finalizado: boolean;
    observacao: string;
    exame: Exame;
    asotipo: Asotipo;
    funcionario: Funcionario;
    situacao: string;
}
