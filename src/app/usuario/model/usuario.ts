import { Acesso } from './acesso';


export class Usuario {
    idusuario: number;
    nome: string;
    nascimento: Date;
    login: string;
    senha: string;
    sexo: string;
    email: string;
    fonecelular: string;
    situacao: boolean;
    acesso: Acesso;
}
