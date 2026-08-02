import { Moment } from "moment";

export interface CadastroBanidosDTO {
    id: string;
    nome: string;
    dataBanimento: Date | Moment;
    rg: string;
    cpf: string;
    motivoBanimento: string;
}