import { RouterLink, Routes } from '@angular/router';
import { BanidosComponent } from '../../pages/banidos/banidos/banidos.component';
import { ConfiguracoesComponent } from '../../pages/configuracoes/configuracoes.component';
import { pageHeaderData } from '../../shared/models/pageHeaderContent/pageHeaderContentModel';
import { OcorrenciasComponent } from '../../pages/ocorrencias/ocorrencias/ocorrencias.component';
import { UsuariosComponent } from '../../pages/usuarios/usuarios/usuarios.component';

export const MainLayoutsRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('../../pages/dashboard/dashboard/dashboard.component')
        .then(c => c.DashboardComponent),
        title: 'Visão geral da operação',
        data: {
            description: null,
            buttonLabel: null,
            icon: null,
            exportable: true,
        }
    },
    {
        path: 'motoristas',
        loadComponent: () => import('../../pages/motoristas/motoristas/motoristas.component')
        .then(c => c.MotoristasComponent),
        title: 'Motoristas',
        data: <pageHeaderData> {
            description: "1.284 motoristas cadastrados — 12 novos nos últimos 30 dias.",
            buttonLabel: "Novo motorista",
            routerLink: 'motoristas/novo',
            icon: 'LucidePlus',
            exportable: true
        }
    },
    {
        path: 'motoristas/novo',
        loadComponent: () => import('../../pages/motoristas/motorista-cadastro/motorista-cadastro.component')
        .then(c => c.MotoristaCadastroComponent),
        title: 'Novo Motorista',
        data: <pageHeaderData> {
            description: "Preencha os dados do cadastro e anexe os documentos obrigatórios para concluir.",
            buttonLabel: "Voltar",
            buttonType: 'outlined',
            routerLink: 'motoristas',
            icon: null
        }
    },
    {
        path: 'motoristas/editar/:id',
        loadComponent: () => import('../../pages/motoristas/motorista-cadastro/motorista-cadastro.component')
        .then(c => c.MotoristaCadastroComponent),
        title: 'Editar Motorista',
        data: <pageHeaderData> {
            description: "Altere os dados do cadastro e anexe os documentos obrigatórios para concluir.",
            buttonLabel: "Voltar",
            buttonType: 'outlined',
            routerLink: 'motoristas',
            icon: null
        }
    },
    {
        path: 'motoristas/visualizar/:id',
        loadComponent: () => import('../../pages/motoristas/motorista-cadastro/motorista-cadastro.component')
        .then(c => c.MotoristaCadastroComponent),
        title: 'Visualizar Motorista',
        data: <pageHeaderData> {
            description: "Altere os dados do cadastro e anexe os documentos obrigatórios para concluir.",
            buttonLabel: "Voltar",
            buttonType: 'outlined',
            routerLink: 'motoristas',
            icon: null
        }
    },
    {
        path: 'associados',
        loadComponent: () => import('../../pages/associados/associados/associados.component')
        .then(c => c.AssociadosComponent),
        title: 'Associados',
        data: <pageHeaderData>{
            description: "318 associados — gerencie cadastros, documentos e veículos.",
            buttonLabel: "Novo associado",
            routerLink: 'associados/novo',
            icon: 'LucidePlus',
            exportable: true
        }
    },
    {
        path: 'associados/novo',
        loadComponent: () => import('../../pages/associados/associados-cadastro/associados-cadastro.component').then(c => c.AssociadosCadastroComponent),
        title: 'Novo Associado',
        data: <pageHeaderData> {
            description: "Preencha os dados do cadastro e anexe os documentos obrigatórios para concluir.",
            buttonLabel: "Voltar",
            buttonType: 'outlined',
            routerLink: 'associados',
            icon: null
        }
    },
    {
        path: 'associados/editar/:id',
        loadComponent: () => import('../../pages/associados/associados-cadastro/associados-cadastro.component').then(c => c.AssociadosCadastroComponent),
        title: 'Editar Associado',
        data: <pageHeaderData> {
            description: "Altere os dados do cadastro e anexe os documentos obrigatórios para concluir.",
            buttonLabel: "Voltar",
            buttonType: 'outlined',
            routerLink: 'associados',
            icon: null
        }
    },
    {
        path: 'associados/visualizar/:id',
        loadComponent: () => import('../../pages/associados/associados-cadastro/associados-cadastro.component').then(c => c.AssociadosCadastroComponent),
        title: 'Visualizar Associado',
        data: <pageHeaderData> {
            description: "Visualize os dados cadastrados.",
            buttonLabel: "Voltar",
            buttonType: 'outlined',
            routerLink: 'associados',
            icon: null
        }
    },
    {
        path: 'vistorias',
        loadComponent: () => import('../../pages/vistorias/vistorias/vistorias.component')
        .then(c => c.VistoriasComponent),
        title: 'Vistorias',
        data:<pageHeaderData> {
            description: "Acompanhe vistorias de frota — aprove ou registre reprovações com motivo detalhado.",
            buttonLabel: "Nova vistoria",
            routerLink: 'vistorias/novo',
            icon: 'LucidePlus',
            exportable: true
        }
    },
    {
        path: 'vistorias/novo',
        loadComponent: () => import('../../pages/vistorias/vistorias-cadastro/vistorias-cadastro.component').then(c => c.VistoriasCadastroComponent),
        title: 'Nova vistoria',
        data:<pageHeaderData> {
            description: "Preencha cada bloco com atenção. Apenas Diretores e Administradores podem aprovar ou reprovar.",
            buttonLabel: "Voltar",
            buttonType: 'outlined',
            routerLink: 'vistorias',
            icon: null,
        }
    },
    {
        path: 'vistorias/visualizar/:id',
        loadComponent: () => import('../../pages/vistorias/vistorias-cadastro/vistorias-cadastro.component').then(c => c.VistoriasCadastroComponent),
        title: 'Visualizar vistoria',
        data:<pageHeaderData> {
            description: "Visualize os dados cadastrados",
            buttonLabel: "Voltar",
            routerLink: 'vistorias',
            buttonType: 'outlined',
            icon: null,
            exportable: true
        }
    },
    {
        path: 'vistorias/editar/:id',
        loadComponent: () => import('../../pages/vistorias/vistorias-cadastro/vistorias-cadastro.component').then(c => c.VistoriasCadastroComponent),

        title: 'Editar vistoria',
        data:<pageHeaderData> {
            description: "Edite os dados cadastrados",
            buttonLabel: "Voltar",
            routerLink: 'vistorias',
            buttonType: 'outlined',
            icon: null,
            exportable: true
        }
    },
    {
        path: 'unidades',
        loadComponent: () => import('../../pages/unidades/unidades/unidades.component').then(c => c.UnidadesComponent),
        title: 'Unidades',
        data:<pageHeaderData> {
            description: "Cadastre e gerencie as unidades operacionais da cooperativa.",
            buttonLabel: "Nova unidade",
            routerLink: 'unidades/novo',
            icon: 'LucidePlus',
            exportable: true
        },
    },
    {
        path: 'unidades/novo',
        loadComponent: () => import('../../pages/unidades/unidades-cadastro/unidades-cadastro.component').then(c => c.UnidadesCadastroComponent),
        title: 'Nova unidade',
        data:<pageHeaderData> {
            description: "",
            buttonLabel: "voltar",
            routerLink: 'unidades',
            buttonType: 'outlined',
            icon: null
        },
    },
    {
        path: 'unidades/editar/:id',
        loadComponent: () => import('../../pages/unidades/unidades-cadastro/unidades-cadastro.component').then(c => c.UnidadesCadastroComponent),
        title: 'Editar unidade',
        data:<pageHeaderData> {
            description: "",
            buttonLabel: "voltar",
            routerLink: 'unidades',
            buttonType: 'outlined',
            icon: null
        },
    },
    {
        path: 'unidades/visualizar/:id',
        loadComponent: () => import('../../pages/unidades/unidades-cadastro/unidades-cadastro.component').then(c => c.UnidadesCadastroComponent),
        title: 'Visualizar unidade',
        data:<pageHeaderData> {
            description: "",
            buttonLabel: "voltar",
            routerLink: 'unidades',
            buttonType: 'outlined',
            icon: null
        },
    },
    {
        path: 'ocorrencias',
        loadComponent: () => import('../../pages/ocorrencias/ocorrencias/ocorrencias.component').then(c => c.OcorrenciasComponent),
        title: 'Ocorrências',
        data:<pageHeaderData> {
            description: "Registro de eventos operacionais reportados pelos diretores.",
            buttonLabel: "Nova ocorrência",
            routerLink: 'ocorrencias/novo',
            icon: 'LucidePlus',
            exportable: true
        },
    },
    {
        path: 'ocorrencias/novo',
        title: 'Nova ocorrência',
        loadComponent: () => import('../../pages/ocorrencias/ocorrencias-cadastro/ocorrencias-cadastro.component').then(c => c.OcorrenciasCadastroComponent),
        data:<pageHeaderData> {
            description: "Registro de eventos operacionais reportados pelos diretores.",
            buttonLabel: "Voltar",
            routerLink: 'ocorrencias',
            buttonType: 'outlined',
            exportable: true
        },
    },
    {
        path: 'ocorrencias/editar/:id',
        loadComponent: () => import('../../pages/ocorrencias/ocorrencias-cadastro/ocorrencias-cadastro.component').then(c => c.OcorrenciasCadastroComponent),
        title: 'Ocorrências',
        data:<pageHeaderData> {
            description: "Registro de eventos operacionais reportados pelos diretores.",
            buttonLabel: "Voltar",
            routerLink: 'ocorrencias',
            buttonType: 'outlined',
            exportable: true
        },
    },
    {
        path: 'ocorrencias/visualizar/:id',
        loadComponent: () => import('../../pages/ocorrencias/ocorrencias-cadastro/ocorrencias-cadastro.component').then(c => c.OcorrenciasCadastroComponent),
        title: 'Ocorrências',
        data:<pageHeaderData> {
            description: "Registro de eventos operacionais reportados pelos diretores.",
            buttonLabel: "Voltar",
            routerLink: 'ocorrencias',
            buttonType: 'outlined',
            exportable: true
        },
    },
    {
        path: 'banidos',
        loadComponent: () => import('../../pages/banidos/banidos/banidos.component').then(c => c.BanidosComponent),
        title: 'Motoristas e associados banidos',
        data:<pageHeaderData> {
            description: "Lista negra utilizada nas validações de cadastro.",
            buttonLabel: "Adicionar banimento",
            routerLink: 'banidos/novo',
            icon: 'LucidePlus',
            exportable: true
        },
    },
    {
        path: 'banidos/novo',
        loadComponent: () => import('../../pages/banidos/banidos-cadastro/banidos-cadastro.component').then(c => c.BanidosCadastroComponent),
        title: 'Novo banimento',
        data:<pageHeaderData> {
            description: "Preencha os dados abaixo.",
            buttonLabel: "voltar",
            routerLink: 'banidos',
            buttonType: 'outlined',
            exportable: false
        },
    },
    {
        path: 'banidos/editar/:id',
        loadComponent: () => import('../../pages/banidos/banidos-cadastro/banidos-cadastro.component').then(c => c.BanidosCadastroComponent),
        title: 'Editar banimento',
        data:<pageHeaderData> {
            description: "Preencha os dados abaixo.",
            buttonLabel: "voltar",
            routerLink: 'banidos',
            buttonType: 'outlined',
            exportable: false
        },
    },
    {
        path: 'banidos/visualizar/:id',
        loadComponent: () => import('../../pages/banidos/banidos-cadastro/banidos-cadastro.component').then(c => c.BanidosCadastroComponent),
        title: 'Visualizar banimento',
        data:<pageHeaderData> {
            description: "Preencha os dados abaixo.",
            buttonLabel: "voltar",
            routerLink: 'banidos',
            buttonType: 'outlined',
            exportable: false
        },
    },
    {
        path: 'usuarios',
       loadComponent: () => import('../../pages/usuarios/usuarios/usuarios.component').then(c => c.UsuariosComponent),
        title: 'Usuários e permissões',
        data:<pageHeaderData> {
            description: "Crie diretores e operadores, defina perfis de acesso e gerencie credenciais.",
            buttonLabel: "Novo usuário",
            routerLink: 'usuarios/novo',
            icon: 'LucidePlus',
            exportable: true
        },
    },
    {
        path: 'usuarios/novo',
       loadComponent: () => import('../../pages/usuarios/usuarios-cadastro/usuarios-cadastro.component').then(c => c.UsuariosCadastroComponent),
        title: 'Novo usuário',
        data:<pageHeaderData> {
            description: "",
            buttonLabel: "Voltar",
            routerLink: 'usuarios',
            buttonType: 'outlined',
        },
    },
    {
        path: 'usuarios/editar/:id',
       loadComponent: () => import('../../pages/usuarios/usuarios-cadastro/usuarios-cadastro.component').then(c => c.UsuariosCadastroComponent),
        title: 'Editar usuário',
        data:<pageHeaderData> {
            description: "",
            buttonLabel: "Voltar",
            routerLink: 'usuarios',
            buttonType: 'outlined',
        },
    },
    {
        path: 'usuarios/visualizar/:id',
       loadComponent: () => import('../../pages/usuarios/usuarios-cadastro/usuarios-cadastro.component').then(c => c.UsuariosCadastroComponent),
        title: 'Visualizar usuário',
        data:<pageHeaderData> {
            description: "",
            buttonLabel: "Voltar",
            routerLink: 'usuarios',
            buttonType: 'outlined',
        },
    },
    {
        path: 'configuracoes',
        component: ConfiguracoesComponent,
        title: 'Configurações',
        data: <pageHeaderData> {
            description: "Preferências da cooperativa, integrações e regras operacionais.",
        } 
    },
    {
        path: '**',        
        redirectTo: '' 
    }
];

