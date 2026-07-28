import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { PageResult } from '../../shared/models/table/Table';
import { CadastroUnidadesDTO } from '../../shared/models/unidades/CadastroUnidadesDTO';


@Service()
export class UnidadesService {
    private readonly http = inject(HttpClient);
    private readonly STORAGE_KEY_UNIDADES_CADASTRO = 'unidades_cadastro'; 

    constructor() {}

    save(data: any, key: any) {
        localStorage.setItem(key, JSON.stringify(data))
    }

    
    // getTableUnidadesPaginado(): Observable<PageResult<DataSourceTableUnidades>> {
    //     return this.http.get<PageResult<DataSourceTableUnidades>>(
    //         'api/v1/unidades/paginado'
    //     );
    // }

    async cadastroUnidades(payload: CadastroUnidadesDTO, id: string) : Promise<PageResult<CadastroUnidadesDTO>> {
        try {
           
            const unidade: CadastroUnidadesDTO = {
                ...payload, 
                id: id,
            }
    
            const response = this.getUnidadesCadastradas();

            
            if(!response.data) {
                response.data = [];
            }
            const unidadeExistente = response.data
            .find(u => u.prefixo === payload.prefixo && u.unidade === payload.unidade);
            
            if(unidadeExistente) {
                return {status: {status: false, message: 'A Unidade já existe'}}
            }
             response.data.push(unidade);

             localStorage.setItem(this.STORAGE_KEY_UNIDADES_CADASTRO, JSON.stringify(response))

             return {status: {status: true, message: 'Unidade adicionada com sucesso!'}}
             
            }catch(e) {
                console.error(e);
                return {status: {status: false, message: 'Ocorreu um erro ao adicionar unidade'}}
        }

        
    }

    getUnidadesCadastradas(): PageResult<CadastroUnidadesDTO> {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY_UNIDADES_CADASTRO)
            if(!data) {
                return {data: []}
            }

            return JSON.parse(data);

        }catch(e) {
            console.error(e);
            return {data: []}
        }
    }

    getUnidadeById(idUnidade: string) {
        try {
            const data = this.getUnidadesCadastradas();
            const unidade = data.data?.find((item) => item.id === idUnidade)

            if(!unidade) {
                return false;
            }
            return unidade;
        } catch(e) {
            console.error(e);
            return undefined;
        }
    }

    deleteVistoriaById(idUnidade: string) {
        try {
            const unidades = this.getUnidadesCadastradas();

            if(!unidades.data) {
                return false;
            }

            const unidadesAtuais = unidades.data.length;

            unidades.data = unidades.data.filter(
                unidade => unidade.id !== idUnidade
            )

            if(unidades.data.length === unidadesAtuais) {
                console.error('Unidade não encontrado')
                return false;
            }

            this.save(unidades, this.STORAGE_KEY_UNIDADES_CADASTRO)
            return true;

        }
        catch(error) {
            console.error(error);
            return false;
        }
    }
    
    async editUnidadeById(idUnidade: string, payload: CadastroUnidadesDTO) {
        try {
            const response = this.getUnidadesCadastradas();

            if(!response.data) {
                return false;
            }
            const unidadeExistente = response.data
            .find(u => u.prefixo === payload.prefixo && u.unidade === payload.unidade);


            const index = response.data?.findIndex(item => item.id === idUnidade);

            if(index === -1) {
                return false;
            }

            if(unidadeExistente) {
               return false; 
            }

            response.data[index] = {
                ...response.data[index],
                ...payload,
            }

            this.save(response, this.STORAGE_KEY_UNIDADES_CADASTRO);
            return true;

        } catch(e) {
            console.error(e);
            return false;
        }
    }

    getTableUnidadesPaginado(
        pageNumber = 1, 
        pageSize = 10,
        pesquisa = null
    ): PageResult<CadastroUnidadesDTO> {
        const storage = localStorage.getItem(this.STORAGE_KEY_UNIDADES_CADASTRO);
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

        const unidades = JSON.parse(storage);
        const data: PageResult<CadastroUnidadesDTO> = {
            data: unidades.data.map((item: any) => ({
                    id: item.id,
                    unidade: item.unidade,
                    prefixo: item.prefixo,
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
