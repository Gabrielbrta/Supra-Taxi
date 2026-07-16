import { Moment } from "moment";
import { SelectOption } from "../forms/SelectOption";

export interface CadastroAssociadoDTO<TFile = File> {
    id: string,
    dadosPessoais: DadosPessoais;
    endereco: Endereco;
    dadosProfissionais: DadosProfissionais;
    documentos: Documentos<TFile>;
    veiculos: Veiculos[];
}

interface DadosPessoais {
    nomeAssociado: string;
    dataNascimento: Moment | string | Date | null;
    nomePai: string;
    nomeMae: string;
    cpfAssociado: string;
    rgAssociado: string;
    dataExpedicaoRG: Moment | string | Date | null;
    cnhAssociado: string;
    dataEmissaoCNH: Moment | string | Date | null;
    dataVencimentoCNH: Moment | string | Date | null;
    nacionalidade: string;
    naturalidade: string;
    estadoCivil: number | string;
    escolaridade: string;
    email: string;
    telAssociado: string | null;
    celAssociado: string;
}

interface DadosProfissionais {
    rct: string,
    cpest: string,
    unidades: SelectOption[],
    rctDataValidade: Moment | string | Date | null,
    rctDataEmissao: Moment | string | Date | null,
    situacao: number | string,
}

interface Endereco {
    cep: string;
    endereco: string;
    numero: string | null;
    complemento: string | null;
    bairro: string | null;
    cidade: string;
    estado: string;

}

interface Veiculos {
    placa: string,
    marca: string,
    modelo: string,
    ano: string,
    cor: string,
    chassi: string,
    renavan: string,
    observacoes: string,
}

export interface Documentos<TFile> {
    cnhDocumento: DocumentItem<TFile> | null;
    cpf: DocumentItem<TFile> | null;
    rg: DocumentItem<TFile> | null;
    rct: DocumentItem<TFile> | null;
    alvara: DocumentItem<TFile> | null;
    cpest: DocumentItem<TFile> | null;
    comprovanteResidencia: DocumentItem<TFile> | null;
    antecedentesCriminais: DocumentItem<TFile> | null;
    foto: DocumentItem<TFile>;

}

export interface DocumentItem<TFile> {
    file: TFile;
    fileName?: string | null;
    mimeType?: string | null;
    documentType: string | null;
}

export type CadastroAssociadoForm = CadastroAssociadoDTO<File>;

export type CadastroAssociadoStorage = CadastroAssociadoDTO<string>;