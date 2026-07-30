import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { PageResult } from '../../shared/models/table/Table';
import { CadastroUnidadesDTO } from '../../shared/models/unidades/CadastroUnidadesDTO';
import { CadastroOcorrenciasDTO } from '../../shared/models/ocorrencias/CadastroOcorrenciasDTO';


@Service()
export class OcorrenciasService {
    private readonly http = inject(HttpClient);
    private readonly STORAGE_KEY_OCORRENCIAS_CADASTRO = 'ocorrencias_cadastro'; 

    constructor() {}

    save(data: any, key: any) {
        localStorage.setItem(key, JSON.stringify(data))
    }

    
    // getTableOcorrenciasPaginado(): Observable<PageResult<DataSourceTableOcorrencias>> {
    //     return this.http.get<PageResult<DataSourceTableOcorrencias>>(
    //         'api/v1/ocorrencias/paginado'
    //     );
    // }

    async cadastroOcorrencias(payload: CadastroOcorrenciasDTO, id: string) : Promise<PageResult<CadastroOcorrenciasDTO>> {
        try {
           
            const ocorrencia: CadastroOcorrenciasDTO = {
                ...payload, 
                id: id,
            }
    
            const response = this.getOcorrenciasCadastradas();

            
            if(!response.data) {
                response.data = [];
            }

             response.data.push(ocorrencia);

             localStorage.setItem(this.STORAGE_KEY_OCORRENCIAS_CADASTRO, JSON.stringify(response))

             return {status: {status: true, message: 'Ocorrência adicionada com sucesso!'}}
             
            }catch(e) {
                console.error(e);
                return {status: {status: false, message: 'Ocorreu um erro ao adicionar ocorrência'}}
        }

        
    }

    getOcorrenciasCadastradas(): PageResult<CadastroOcorrenciasDTO> {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY_OCORRENCIAS_CADASTRO)
            if(!data) {
                return {data: []}
            }

            return JSON.parse(data);

        }catch(e) {
            console.error(e);
            return {data: []}
        }
    }

    getOcorrenciaById(idOcorrencia: string) {
        try {
            const data = this.getOcorrenciasCadastradas();
            const ocorrencia = data.data?.find((item) => item.id === idOcorrencia)

            if(!ocorrencia) {
                return false;
            }
            return ocorrencia;
        } catch(e) {
            console.error(e);
            return undefined;
        }
    }

    deleteOcorrenciaById(idOcorrencia: string) {
        try {
            const ocorrencias = this.getOcorrenciasCadastradas();

            if(!ocorrencias.data) {
                return false;
            }

            const ocorrenciasAtuais = ocorrencias.data.length;

            ocorrencias.data = ocorrencias.data.filter(
                ocorrencia => ocorrencia.id !== idOcorrencia
            )

            if(ocorrencias.data.length === ocorrenciasAtuais) {
                console.error('Ocorrência não encontrada')
                return false;
            }

            this.save(ocorrencias, this.STORAGE_KEY_OCORRENCIAS_CADASTRO)
            return true;

        }
        catch(error) {
            console.error(error);
            return false;
        }
    }
    
    async editOcorrenciaById(idOcorrencia: string, payload: CadastroOcorrenciasDTO) {
        try {
            const response = this.getOcorrenciasCadastradas();

            if(!response.data) {
                return false;
            }

            const index = response.data?.findIndex(item => item.id === idOcorrencia);

            if(index === -1) {
                return false;
            }

            response.data[index] = {
                ...response.data[index],
                ...payload,
            }

            this.save(response, this.STORAGE_KEY_OCORRENCIAS_CADASTRO);
            return true;

        } catch(e) {
            console.error(e);
            return false;
        }
    }

    getTableOcorrenciasPaginado(
        pageNumber = 1, 
        pageSize = 10,
        pesquisa = null
    ): PageResult<CadastroOcorrenciasDTO> {
        const storage = localStorage.getItem(this.STORAGE_KEY_OCORRENCIAS_CADASTRO);
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

        const ocorrencias = JSON.parse(storage);
        const data: PageResult<CadastroOcorrenciasDTO> = {
            data: ocorrencias.data.map((item: any) => ({
                    id: item.id,
                    usuario: item.usuario,
                    unidade: item.unidade,
                    dataOcorrencia: item.dataOcorrencia,
                    descricao: item.descricao,
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
