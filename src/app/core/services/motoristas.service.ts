import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { MOTORISTAS_TABLE } from '../../shared/models/Mock-motoristas-table';
import { DataSourceTableMotorista } from '../../shared/models/motoristas/dataSourceTableMotorista';
import { PageResult } from '../../shared/models/table/Table';
import { CadastroMotoristaForm, CadastroMotoristaDTO, CadastroMotoristaStorage, Documentos } from '../../shared/models/motoristas/cadastroMotoristaDTO';
import { DataSource } from '@angular/cdk/collections';
import moment from 'moment';


@Service()
export class MotoristasService {
    private readonly http = inject(HttpClient);
    private readonly STORAGE_KEY_MOTORISTAS_TABLE = 'motoristas_table'; 
    private readonly STORAGE_KEY_MOTORISTAS_CADASTRO = 'motoristas_cadastro'; 

    constructor() {
        if(!localStorage.getItem(this.STORAGE_KEY_MOTORISTAS_TABLE)) {
            this.save(MOTORISTAS_TABLE, this.STORAGE_KEY_MOTORISTAS_TABLE);
        }
        this.getTableMotoristasPaginado()
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

    
    // getTableMotoristasPaginado(): Observable<PageResult<DataSourceTableMotorista>> {
    //     return this.http.get<PageResult<DataSourceTableMotorista>>(
    //         'api/v1/motoristas/paginado'
    //     );
    // }

    async cadastroMotorista(payload: CadastroMotoristaForm, id: string): Promise<PageResult<CadastroMotoristaStorage>> {
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
            const motorista: CadastroMotoristaStorage = {
                ...payload, 
                id: id,
                documentos
            }
    
            const response = this.getMotoristasCadastrados();
            
            if(!response.data) {
                response.data = [];
            }
             response.data.push(motorista);

             localStorage.setItem(this.STORAGE_KEY_MOTORISTAS_CADASTRO, JSON.stringify(response))

             return {status: {status: true, message: 'Motorista adicionado com sucesso!'}}
             
            }catch(e) {
                console.error(e);
                return {status: {status: false, message: 'Ocorreu um erro ao adicionar motorista'}}
        }

        
    }

    getMotoristasCadastrados(): PageResult<CadastroMotoristaStorage> {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY_MOTORISTAS_CADASTRO)
            if(!data) {
                return {data: []}
            }

            return JSON.parse(data);

        }catch(e) {
            console.error(e);
            return {data: []}
        }
    }

    getMotoristaById(idMotorista: string) {
        try {
            const data = this.getMotoristasCadastrados();
            const motorista = data.data?.find((item) => item.id === idMotorista)

            if(!motorista) {
                return false;
            }
            return motorista;
        } catch(e) {
            console.error(e);
            return undefined;
        }
    }

    deleteMotoristaById(idMotorista: string) {
        try {
            const motoristas = this.getMotoristasCadastrados();

            if(!motoristas.data) {
                return false;
            }

            const motoristasAtuais = motoristas.data.length;

            motoristas.data = motoristas.data.filter(
                motorista => motorista.id !== idMotorista
            )

            if(motoristas.data.length === motoristasAtuais) {
                console.error('Motorista não encontrado')
                return false;
            }

            this.save(motoristas, this.STORAGE_KEY_MOTORISTAS_CADASTRO)
            return true;

        }
        catch(error) {
            console.error(error);
            return false;
        }
    }
    async editMotoristaById(idMotorista: string, payload: CadastroMotoristaForm) {
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
            const response = this.getMotoristasCadastrados();
            if(!response.data) {
                return false;
            }

            const index = response.data?.findIndex(item => item.id === idMotorista);

            if(index === -1) {
                return false;
            }

            response.data[index] = {
                ...response.data[index],
                ...payload,
                documentos
            }

            this.save(response, this.STORAGE_KEY_MOTORISTAS_CADASTRO);
            return true;

        } catch(e) {
            console.error(e);
            return false;
        }
    }

    getTableMotoristasPaginado(
        pageNumber = 1, 
        pageSize = 10,
        pesquisa = null
    ): PageResult<DataSourceTableMotorista> {
        const storage = localStorage.getItem(this.STORAGE_KEY_MOTORISTAS_CADASTRO);
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

        const motoristas = JSON.parse(storage);
        const data: PageResult<DataSourceTableMotorista> = {
            data: motoristas.data.map((item: any) => ({
                    id: item.id,
                    nomeMotorista: item.dadosPessoais.nomeMotorista,
                    telMotorista: item.dadosPessoais.celMotorista,
                    cpf: item.dadosPessoais.cpfMotorista,
                    rct: item.dadosProfissionais.rct,
                    cnh: item.dadosPessoais.cnhMotorista,
                    status: item.dadosProfissionais.situacao,
                    cadastroMotorista: new Date(),
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
