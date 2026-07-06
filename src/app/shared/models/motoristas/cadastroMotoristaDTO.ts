import { Moment } from "moment";

export interface CadastroMotoristaDTO<TFile = File> {
    id: string,
    dadosPessoais: DadosPessoais;
    endereco: Endereco;
    dadosProfissionais: DadosProfissionais;
    documentos: Documentos<TFile>;
}

interface DadosPessoais {
    nomeMotorista: string;
    nomePai: string;
    nomeMae: string;
    cpfMotorista: string;
    rgMotorista: string;
    cnhMotorista: string;
    dataEmissaoCNH: Moment | string | Date | null;
    dataValidadeCNH: Moment | string | Date | null;
    nacionalidade: string;
    naturalidade: string;
    estadoCivil: number | string;
    escolaridade: string;
    email: string;
    telMotorista: string | null;
    celMotorista: string;
}

interface DadosProfissionais {
    rct: string,
    rctDataValidade: Moment | string | Date | null,
    registro: string | null,
    situacao: number | string,
    observacoes: string | null
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

export interface Documentos<TFile> {
    cnhDocumento: DocumentItem<TFile> | null;
    cpf: DocumentItem<TFile> | null;
    rg: DocumentItem<TFile> | null;
    rct: DocumentItem<TFile> | null;
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

export type CadastroMotoristaForm = CadastroMotoristaDTO<File>;

export type CadastroMotoristaStorage = CadastroMotoristaDTO<string>;