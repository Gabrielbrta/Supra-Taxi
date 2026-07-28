import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { PageResult } from '../../shared/models/table/Table';
import { StatusEnum } from '../../shared/enums/StatusEnum';
import { CadastroVistoriaDTO } from '../../shared/models/vistorias/CadastroVistoriaDTO';
import { DataSourceTableVistorias } from '../../shared/models/vistorias/DataSourceTableVistorias';


@Service()
export class VistoriaService {
    private readonly http = inject(HttpClient);
    private readonly STORAGE_KEY_VISTORIAS_TABLE = 'vistorias_table'; 
    private readonly STORAGE_KEY_VISTORIAS_CADASTRO = 'vistorias_cadastro'; 

    constructor() {}

    save(data: any, key: any) {
        localStorage.setItem(key, JSON.stringify(data))
    }

    
    // getTableVistoriasPaginado(): Observable<PageResult<DataSourceTableVistorias>> {
    //     return this.http.get<PageResult<DataSourceTableVistorias>>(
    //         'api/v1/vistorias/paginado'
    //     );
    // }

    async cadastroVistoria(payload: CadastroVistoriaDTO, id: string): Promise<PageResult<CadastroVistoriaDTO>> {
        try {
           
            const vistoria: CadastroVistoriaDTO = {
                ...payload, 
                id: id,
            }
    
            const response = this.getVistoriasCadastradas();
            
            if(!response.data) {
                response.data = [];
            }
             response.data.push(vistoria);

             localStorage.setItem(this.STORAGE_KEY_VISTORIAS_CADASTRO, JSON.stringify(response))

             return {status: {status: true, message: 'Vistoria adicionada com sucesso!'}}
             
            }catch(e) {
                console.error(e);
                return {status: {status: false, message: 'Ocorreu um erro ao adicionar vistoria'}}
        }

        
    }

    getVistoriasCadastradas(): PageResult<CadastroVistoriaDTO> {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY_VISTORIAS_CADASTRO)
            if(!data) {
                return {data: []}
            }

            return JSON.parse(data);

        }catch(e) {
            console.error(e);
            return {data: []}
        }
    }

    getVistoriaById(idVistoria: string) {
        try {
            const data = this.getVistoriasCadastradas();
            const vistoria = data.data?.find((item) => item.id === idVistoria)

            if(!vistoria) {
                return false;
            }
            return vistoria;
        } catch(e) {
            console.error(e);
            return undefined;
        }
    }

    deleteVistoriaById(idVistoria: string) {
        try {
            const vistorias = this.getVistoriasCadastradas();

            if(!vistorias.data) {
                return false;
            }

            const vistoriasAtuais = vistorias.data.length;

            vistorias.data = vistorias.data.filter(
                vistoria => vistoria.id !== idVistoria
            )

            if(vistorias.data.length === vistoriasAtuais) {
                console.error('Vistoria não encontrado')
                return false;
            }

            this.save(vistorias, this.STORAGE_KEY_VISTORIAS_CADASTRO)
            return true;

        }
        catch(error) {
            console.error(error);
            return false;
        }
    }
    
    async editVistoriaById(idVistoria: string, payload: CadastroVistoriaDTO) {
        try {
            const response = this.getVistoriasCadastradas();

            if(!response.data) {
                return false;
            }

            const index = response.data?.findIndex(item => item.id === idVistoria);

            if(index === -1) {
                return false;
            }

            response.data[index] = {
                ...response.data[index],
                ...payload,
            }

            this.save(response, this.STORAGE_KEY_VISTORIAS_CADASTRO);
            return true;

        } catch(e) {
            console.error(e);
            return false;
        }
    }

    getTableVistoriaPaginado(
        pageNumber = 1, 
        pageSize = 10,
        pesquisa = null
    ): PageResult<DataSourceTableVistorias> {
        const storage = localStorage.getItem(this.STORAGE_KEY_VISTORIAS_CADASTRO);
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

        const vistorias = JSON.parse(storage);
        const data: PageResult<DataSourceTableVistorias> = {
            data: vistorias.data.map((item: any) => ({
                    id: item.id,
                    unidade: item.unidade,
                    veiculo:  item.veiculo,
                    proprietario: item.proprietario,
                    diretor: item.diretorResponsavel,
                    dataVistoria: item.dataVistoria,
                    situacao: item.dadosVisuais.aprovarVistoria === 1 ? 4 : 2,
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
