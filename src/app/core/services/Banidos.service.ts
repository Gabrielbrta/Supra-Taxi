import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { PageResult } from '../../shared/models/table/Table';
import { CadastroUnidadesDTO } from '../../shared/models/unidades/CadastroUnidadesDTO';
import { CadastroBanidosDTO } from '../../shared/models/banidos/CadastroBanidosDTO';


@Service()
export class BanidosService {
    private readonly http = inject(HttpClient);
    private readonly STORAGE_KEY_BANIDOS_CADASTRO = 'banidos_cadastro'; 

    constructor() {}

    save(data: any, key: any) {
        localStorage.setItem(key, JSON.stringify(data))
    }

    
    // getTableBanidosPaginado(): Observable<PageResult<DataSourceTableBanidos>> {
    //     return this.http.get<PageResult<DataSourceTableBanidos>>(
    //         'api/v1/banidos/paginado'
    //     );
    // }

    async cadastroBanimento(payload: CadastroBanidosDTO, id: string) : Promise<PageResult<CadastroBanidosDTO>> {
        try {
           
            const banido: CadastroBanidosDTO = {
                ...payload, 
                id: id,
            }
    
            const response = this.getBanimentosCadastrados();

            
            if(!response.data) {
                response.data = [];
            }

             response.data.push(banido);

             localStorage.setItem(this.STORAGE_KEY_BANIDOS_CADASTRO, JSON.stringify(response))

             return {status: {status: true, message: 'Banimento adicionado com sucesso!'}}
             
            }catch(e) {
                console.error(e);
                return {status: {status: false, message: 'Ocorreu um erro ao adicionar banimento'}}
        }

        
    }

    getBanimentosCadastrados(): PageResult<CadastroBanidosDTO> {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY_BANIDOS_CADASTRO)
            if(!data) {
                return {data: []}
            }

            return JSON.parse(data);

        }catch(e) {
            console.error(e);
            return {data: []}
        }
    }

    getBanimentoById(idBanimento: string) {
        try {
            const data = this.getBanimentosCadastrados();
            const banido = data.data?.find((item) => item.id === idBanimento)

            if(!banido) {
                return false;
            }
            return banido;
        } catch(e) {
            console.error(e);
            return undefined;
        }
    }

    deleteBanimentoById(idBanimento: string) {
        try {
            const banidos = this.getBanimentosCadastrados();

            if(!banidos.data) {
                return false;
            }

            const banidosAtuais = banidos.data.length;

            banidos.data = banidos.data.filter(
                banido => banido.id !== idBanimento
            )

            if(banidos.data.length === banidosAtuais) {
                console.error('Banimento não encontrado')
                return false;
            }

            this.save(banidos, this.STORAGE_KEY_BANIDOS_CADASTRO)
            return true;

        }
        catch(error) {
            console.error(error);
            return false;
        }
    }
    
    async editBanimentoById(idBanimento: string, payload: CadastroBanidosDTO) {
        try {
            const response = this.getBanimentosCadastrados();

            if(!response.data) {
                return false;
            }

            const index = response.data?.findIndex(item => item.id === idBanimento);

            if(index === -1) {
                return false;
            }

            response.data[index] = {
                ...response.data[index],
                ...payload,
            }

            this.save(response, this.STORAGE_KEY_BANIDOS_CADASTRO);
            return true;

        } catch(e) {
            console.error(e);
            return false;
        }
    }

    getTableBanimentosPaginado(
        pageNumber = 1, 
        pageSize = 10,
        pesquisa = null
    ): PageResult<CadastroBanidosDTO> {
        const storage = localStorage.getItem(this.STORAGE_KEY_BANIDOS_CADASTRO);
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

        const banidos = JSON.parse(storage);
        const data: PageResult<CadastroBanidosDTO> = {
            data: banidos.data.map((item: any) => ({
                    id: item.id,
                    nome: item.nome,
                    cpf: item.cpf,
                    rg: item.rg,
                    dataBanimento: item.dataBanimento,
                    motivoBanimento: item.motivoBanimento,
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
