import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { DataSourceTableMotorista } from '../../shared/models/motoristas/dataSourceTableMotorista';
import { PageResult } from '../../shared/models/table/Table';
import { DataSource } from '@angular/cdk/collections';
import moment from 'moment';
import { CadastroAssociadoForm, CadastroAssociadoStorage, Documentos } from '../../shared/models/associados/CadastroAssociadoDTO';
import { DataSourceTableAssociados } from '../../shared/models/associados/DataSourceTableAssociados';
import { StatusEnum } from '../../shared/enums/StatusEnum';
import { CadastroVistoriaDTO } from '../../shared/models/vistorias/CadastroVistoriaDTO';


@Service()
export class VistoriaService {
    private readonly http = inject(HttpClient);
    private readonly STORAGE_KEY_VISTORIAS_TABLE = 'vistorias_table'; 
    private readonly STORAGE_KEY_VISTORIAS_CADASTRO = 'vistorias_cadastro'; 

    constructor() {
        // if(!localStorage.getItem(this.STORAGE_KEY_ASSOCIADOS_TABLE)) {
        //     this.save(ASSOCIADOS_TABLE, this.STORAGE_KEY_ASSOCIADOS_TABLE);
        // }
        // this.getTableAssociadosPaginado()
    }

    save(data: any, key: any) {
        localStorage.setItem(key, JSON.stringify(data))
    }

    
    // getTableAssociadosPaginado(): Observable<PageResult<DataSourceTableAssociados>> {
    //     return this.http.get<PageResult<DataSourceTableAssociados>>(
    //         'api/v1/associados/paginado'
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

    // getAssociadoById(idAssociado: string) {
    //     try {
    //         const data = this.getAssociadosCadastrados();
    //         const associado = data.data?.find((item) => item.id === idAssociado)

    //         if(!associado) {
    //             return false;
    //         }
    //         return associado;
    //     } catch(e) {
    //         console.error(e);
    //         return undefined;
    //     }
    // }

    // deleteAssociadoById(idAssociado: string) {
    //     try {
    //         const associados = this.getAssociadosCadastrados();

    //         if(!associados.data) {
    //             return false;
    //         }

    //         const associadosAtuais = associados.data.length;

    //         associados.data = associados.data.filter(
    //             motorista => motorista.id !== idAssociado
    //         )

    //         if(associados.data.length === associadosAtuais) {
    //             console.error('Associado não encontrado')
    //             return false;
    //         }

    //         this.save(associados, this.STORAGE_KEY_ASSOCIADOS_CADASTRO)
    //         return true;

    //     }
    //     catch(error) {
    //         console.error(error);
    //         return false;
    //     }
    // }
    // async editAssociadoById(idAssociado: string, payload: CadastroAssociadoForm) {
    //     try {
            

    //     } catch(e) {

    //     }
    // }

    // getTableAssociadosPaginado(
    //     pageNumber = 1, 
    //     pageSize = 10,
    //     pesquisa = null
    // ): PageResult<DataSourceTableAssociados> {
    //     const storage = localStorage.getItem(this.STORAGE_KEY_ASSOCIADOS_CADASTRO);
    //     if(!storage) {
    //         return {
    //             data: [],
    //             paginadora: {
    //                 pageNumber,
    //                 pageSize,
    //                 totalCount: 0,
    //                 totalPages: 0,
    //                 hasNextPage: false,
    //                 hasPreviousPage: false,
    //             }
    //         }
    //     }

    //     const associados = JSON.parse(storage);
    //     const data: PageResult<DataSourceTableAssociados> = {
    //         data: associados.data.map((item: any) => ({
    //                 id: item.id,
    //                 nomeAssociado: item.dadosPessoais.nomeAssociado,
    //                 email:  item.dadosPessoais.email,
    //                 unidades: item.dadosProfissionais.unidades.toString(),
    //                 rct: item.dadosProfissionais.rct,
    //                 veiculos: item.veiculos.length,
    //                 telAssociado: item.dadosPessoais.telAssociado,
    //                 status: item.dadosProfissionais.situacao,
    //                 cadastroAssociado: new Date()
    //             })),
    //     }

    //     const totalCount = data.data?.length;
    //     const totalPages = Math.ceil(totalCount! / pageSize);

    //     const inicio = (pageNumber - 1) * pageSize;
    //     const fim = inicio + pageSize;

    //     return {
    //         data: data.data?.slice(inicio, fim),
    //         paginadora: {
    //             pageNumber,
    //             pageSize,
    //             totalCount,
    //             totalPages,
    //             hasNextPage: pageNumber < totalPages,
    //             hasPreviousPage: pageNumber > 1
    //         }
    //     };
    // }
}
