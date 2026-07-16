import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { DataSourceTableMotorista } from '../../shared/models/motoristas/dataSourceTableMotorista';
import { PageResult } from '../../shared/models/table/Table';
import { DataSource } from '@angular/cdk/collections';
import moment from 'moment';
import { CadastroAssociadoForm, CadastroAssociadoStorage, Documentos } from '../../shared/models/associados/CadastroAssociadoDTO';
import { DataSourceTableAssociados } from '../../shared/models/associados/DataSourceTableAssociados';
import { StatusEnum } from '../../shared/enums/StatusEnum';


@Service()
export class AssociadosService {
    private readonly http = inject(HttpClient);
    private readonly STORAGE_KEY_ASSOCIADOS_TABLE = 'associados_table'; 
    private readonly STORAGE_KEY_ASSOCIADOS_CADASTRO = 'associados_cadastro'; 

    constructor() {
        // if(!localStorage.getItem(this.STORAGE_KEY_ASSOCIADOS_TABLE)) {
        //     this.save(ASSOCIADOS_TABLE, this.STORAGE_KEY_ASSOCIADOS_TABLE);
        // }
        this.getTableAssociadosPaginado()
    }

    private fileToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;

            reader.readAsDataURL(file);
        });
    }

    save(data: any, key: any) {
        localStorage.setItem(key, JSON.stringify(data))
    }

    
    // getTableAssociadosPaginado(): Observable<PageResult<DataSourceTableAssociados>> {
    //     return this.http.get<PageResult<DataSourceTableAssociados>>(
    //         'api/v1/associados/paginado'
    //     );
    // }

    async cadastroAssociado(payload: CadastroAssociadoForm, id: string): Promise<PageResult<CadastroAssociadoStorage>> {
        try {
            const keys = Object.keys(payload.documentos) as Array<keyof Documentos<File>>;
            const documentos = {} as Documentos<string>;

            for(const key of keys) {
                const documento = payload.documentos[key];

                if(!documento) {
                    if (key === 'foto') {
                        throw new Error('A foto é obrigatória.');
                    }
                    documentos[key] = null;
                    continue;
                }
    
                documentos[key as keyof Documentos<string>] = {
                    file: await this.fileToBase64(documento.file),
                    fileName: documento.file.name,
                    mimeType: documento.file.type,
                    documentType: documento.documentType,
                }
            }
            const associado: CadastroAssociadoStorage = {
                ...payload, 
                id: id,
                documentos
            }
    
            const response = this.getAssociadosCadastrados();
            
            if(!response.data) {
                response.data = [];
            }
             response.data.push(associado);

             localStorage.setItem(this.STORAGE_KEY_ASSOCIADOS_CADASTRO, JSON.stringify(response))

             return {status: {status: true, message: 'Associado adicionado com sucesso!'}}
             
            }catch(e) {
                console.error(e);
                return {status: {status: false, message: 'Ocorreu um erro ao adicionar associado'}}
        }

        
    }

    getAssociadosCadastrados(): PageResult<CadastroAssociadoStorage> {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY_ASSOCIADOS_CADASTRO)
            if(!data) {
                return {data: []}
            }

            return JSON.parse(data);

        }catch(e) {
            console.error(e);
            return {data: []}
        }
    }

    getAssociadoById(idAssociado: string) {
        try {
            const data = this.getAssociadosCadastrados();
            const associado = data.data?.find((item) => item.id === idAssociado)

            if(!associado) {
                return false;
            }
            return associado;
        } catch(e) {
            console.error(e);
            return undefined;
        }
    }

    deleteAssociadoById(idAssociado: string) {
        try {
            const associados = this.getAssociadosCadastrados();

            if(!associados.data) {
                return false;
            }

            const associadosAtuais = associados.data.length;

            associados.data = associados.data.filter(
                motorista => motorista.id !== idAssociado
            )

            if(associados.data.length === associadosAtuais) {
                console.error('Associado não encontrado')
                return false;
            }

            this.save(associados, this.STORAGE_KEY_ASSOCIADOS_CADASTRO)
            return true;

        }
        catch(error) {
            console.error(error);
            return false;
        }
    }
    async editAssociadoById(idAssociado: string, payload: CadastroAssociadoForm) {
        try {
             const keys = Object.keys(payload.documentos) as Array<keyof Documentos<File>>;
            const documentos = {} as Documentos<string>;

            for(const key of keys) {
                const documento = payload.documentos[key];

                if(!documento) {
                    if (key === 'foto') {
                        throw new Error('A foto é obrigatória.');
                    }
                    documentos[key] = null;
                    continue;
                }
    
                documentos[key as keyof Documentos<string>] = {
                    file: await this.fileToBase64(documento.file),
                    fileName: documento.file.name,
                    mimeType: documento.file.type,
                    documentType: documento.documentType,
                }
            }
            const response = this.getAssociadosCadastrados();
            if(!response.data) {
                return false;
            }

            const index = response.data?.findIndex(item => item.id === idAssociado);

            if(index === -1) {
                return false;
            }

            response.data[index] = {
                ...response.data[index],
                ...payload,
                documentos
            }

            this.save(response, this.STORAGE_KEY_ASSOCIADOS_CADASTRO);
            return true;

        } catch(e) {
            console.error(e);
            return false;
        }
    }

    getTableAssociadosPaginado(
        pageNumber = 1, 
        pageSize = 10,
        pesquisa = null
    ): PageResult<DataSourceTableAssociados> {
        const storage = localStorage.getItem(this.STORAGE_KEY_ASSOCIADOS_CADASTRO);
        if(!storage) {
            return {
                data: [],
                paginadora: {
                    pageNumber,
                    pageSize,
                    totalCount: 0,
                    totalPages: 0,
                    hasNextPage: false,
                    hasPreviousPage: false,
                }
            }
        }

        const associados = JSON.parse(storage);
        const data: PageResult<DataSourceTableAssociados> = {
            data: associados.data.map((item: any) => ({
                    id: item.id,
                    nomeAssociado: item.dadosPessoais.nomeAssociado,
                    email:  item.dadosPessoais.email,
                    unidades: item.dadosProfissionais.unidades.toString(),
                    rct: item.dadosProfissionais.rct,
                    veiculos: item.veiculos.length,
                    telAssociado: item.dadosPessoais.telAssociado,
                    status: item.dadosProfissionais.situacao,
                    cadastroAssociado: new Date()
                })),
        }

        const totalCount = data.data?.length;
        const totalPages = Math.ceil(totalCount! / pageSize);

        const inicio = (pageNumber - 1) * pageSize;
        const fim = inicio + pageSize;

        return {
            data: data.data?.slice(inicio, fim),
            paginadora: {
                pageNumber,
                pageSize,
                totalCount,
                totalPages,
                hasNextPage: pageNumber < totalPages,
                hasPreviousPage: pageNumber > 1
            }
        };
    }
}
