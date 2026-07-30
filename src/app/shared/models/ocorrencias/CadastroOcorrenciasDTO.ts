import { Moment } from "moment";

export interface CadastroOcorrenciasDTO {
    id: string;
    usuario: string;
    unidade: number | string;
    dataOcorrencia: Date | Moment | null;
    descricao: string;
}