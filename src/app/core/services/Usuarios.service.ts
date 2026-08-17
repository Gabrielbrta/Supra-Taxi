import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { PageResult } from '../../shared/models/table/Table';
import { CadastroUnidadesDTO } from '../../shared/models/unidades/CadastroUnidadesDTO';
import { CadastroOcorrenciasDTO } from '../../shared/models/ocorrencias/CadastroOcorrenciasDTO';
import { CadastroUsuarioDTO } from '../../shared/models/usuarios/CadastroUsuarioDTO';
import { StatusEnum } from '../../shared/enums/StatusEnum';


@Service()
export class UsuarioService {
    private readonly http = inject(HttpClient);
    private readonly STORAGE_KEY_USUARIOS_CADASTRO = 'usuarios_cadastro'; 

    constructor() {}

    save(data: any, key: any) {
        localStorage.setItem(key, JSON.stringify(data))
    }

    
    // getTableUsuarioPaginado(): Observable<PageResult<DataSourceTableUsuario>> {
    //     return this.http.get<PageResult<DataSourceTableUsuario>>(
    //         'api/v1/usuarios/paginado'
    //     );
    // }

    async cadastroUsuario(payload: CadastroUsuarioDTO, id: string) : Promise<PageResult<CadastroUsuarioDTO>> {
        try {
           
            const usuario: CadastroUsuarioDTO = {
                ...payload, 
                id: id,
            }
    
            const response = this.getUsuarioCadastrados();

            
            if(!response.data) {
                response.data = [];
            }

             response.data.push(usuario);

             localStorage.setItem(this.STORAGE_KEY_USUARIOS_CADASTRO, JSON.stringify(response))

             return {status: {status: true, message: 'Usuário cadastrado com sucesso!'}}
             
            }catch(e) {
                console.error(e);
                return {status: {status: false, message: 'Ocorreu um erro ao criar usuário'}}
        }

        
    }

    getUsuarioCadastrados(): PageResult<CadastroUsuarioDTO> {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY_USUARIOS_CADASTRO)
            if(!data) {
                return {data: []}
            }

            return JSON.parse(data);

        }catch(e) {
            console.error(e);
            return {data: []}
        }
    }

    getUsuarioById(idUsuario: string) {
        try {
            const data = this.getUsuarioCadastrados();
            const usuario = data.data?.find((item) => item.id === idUsuario)

            if(!usuario) {
                return false;
            }
            return usuario;
        } catch(e) {
            console.error(e);
            return undefined;
        }
    }

    deleteUsuarioById(idUsuario: string) {
        try {
            const usuario = this.getUsuarioCadastrados();

            if(!usuario.data) {
                return false;
            }

            const usuarioAtuais = usuario.data.length;

            usuario.data = usuario.data.filter(
                ocorrencia => ocorrencia.id !== idUsuario
            )

            if(usuario.data.length === usuarioAtuais) {
                console.error('Ocorrência não encontrada')
                return false;
            }

            this.save(usuario, this.STORAGE_KEY_USUARIOS_CADASTRO)
            return true;

        }
        catch(error) {
            console.error(error);
            return false;
        }
    }
    
    async editUsuarioById(idUsuario: string, payload: CadastroUsuarioDTO) {
        try {
            const response = this.getUsuarioCadastrados();

            if(!response.data) {
                return false;
            }

            const index = response.data?.findIndex(item => item.id === idUsuario);

            if(index === -1) {
                return false;
            }

            response.data[index] = {
                ...response.data[index],
                ...payload,
            }

            this.save(response, this.STORAGE_KEY_USUARIOS_CADASTRO);
            return true;

        } catch(e) {
            console.error(e);
            return false;
        }
    }

    getTableUsuarioPaginado(
        pageNumber = 1, 
        pageSize = 10,
        pesquisa = null
    ): PageResult<CadastroUsuarioDTO> {
        const storage = localStorage.getItem(this.STORAGE_KEY_USUARIOS_CADASTRO);
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

        const usuarios = JSON.parse(storage);
        const data: PageResult<CadastroUsuarioDTO> = {
            data: usuarios.data.map((item: any) => ({
                    id: item.id,
                    nome: item.nome,
                    tipoUsuario: item.tipoUsuario,
                    status: item.status === 1 ? StatusEnum.Ativo : StatusEnum.Inativo
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
