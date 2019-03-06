import { Funcao } from 'src/app/funcao/model/funcao';
import { Loja } from 'src/app/loja/model/loja';

export class Funcionario {

  idfuncionario: number;
  nome: string;
  dataadmissao: Date;
  situacao: boolean;
  funcao: Funcao;
  loja: Loja;

}
