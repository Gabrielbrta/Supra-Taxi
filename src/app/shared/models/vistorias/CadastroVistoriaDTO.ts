import { Moment } from "moment";
import { OpcaoChecklist } from "../table/TableCheckList";

export interface CadastroVistoriaDTO {
    id: string;
    checklistPneus: OpcaoChecklist[];
    checkListItems: OpcaoChecklist[];
    dataVistoria: Moment | string | Date;
    diretorResponsavel: string;
    unidade: string;
    rct: string;
    cpest: string;

    veiculo: string,
    proprietario: string,
    auxiliar: string| null,
    km: string,
    ano: string | null,
    modelo: string | null,
    dadosVisuais: itemDadosVisuais;
}

export interface itemDadosVisuais {
    ladoDireito: string;
    ladoDireitoDescricao: string | null;
    ladoEsquerdo: string;
    ladoEsquerdoDescricao: string | null;
    paraChoqueDianteiro: string;
    paraChoqueDianteiroDescricao: string | null;
    paraChoqueTraseiro: string;
    paraChoqueTraseiroDescricao: string | null;
    parteSuperior: string;
    parteSuperiorDescricao: string | null;
    motivoReprovacao: string | null;
    aprovarVistoria: boolean;
    observacaoGeral: string | null;
}
