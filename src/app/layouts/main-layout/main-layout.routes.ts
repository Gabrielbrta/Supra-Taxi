import { RouterLink, Routes } from '@angular/router';
import { DashboardComponent } from '../../pages/dashboard/dashboard/dashboard.component';
import { MotoristasComponent } from '../../pages/motoristas/motoristas/motoristas.component';
import { AssociadosComponent } from '../../pages/associados/associados/associados.component';
import { UnidadesComponent } from '../../pages/unidades/unidades.component';
import { BanidosComponent } from '../../pages/banidos/banidos.component';
import { OcorrenciasComponent } from '../../pages/ocorrencias/ocorrencias.component';
import { UsuariosComponent } from '../../pages/admin/usuarios/usuarios.component';
import { ConfiguracoesComponent } from '../../pages/configuracoes/configuracoes.component';
import { VistoriasComponent } from '../../pages/vistorias/vistorias/vistorias.component';
import { pageHeaderData } from '../../shared/models/pageHeaderContent/pageHeaderContentModel';
import { MotoristaCadastroComponent } from '../../pages/motoristas/motorista-cadastro/motorista-cadastro.component';
import { AssociadosCadastroComponent } from '../../pages/associados/associados-cadastro/associados-cadastro/associados-cadastro.component';
import { VistoriasCadastroComponent } from '../../pages/vistorias/vistorias-cadastro/vistorias-cadastro.component';

export const MainLayoutsRoutes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
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
        component: MotoristasComponent,
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
        component: MotoristaCadastroComponent,
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
        component: MotoristaCadastroComponent,
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
        component: MotoristaCadastroComponent,
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
        component: AssociadosComponent,
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
        component: AssociadosCadastroComponent,
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
        component: AssociadosCadastroComponent,
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
        component: AssociadosCadastroComponent,
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
        component: VistoriasComponent,
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
        component: VistoriasCadastroComponent,
        title: 'Nova vistoria',
        data:<pageHeaderData> {
            description: "Preencha cada bloco com atenção. Apenas Diretores e Administradores podem aprovar ou reprovar.",
            buttonLabel: "Voltar",
            routerLink: 'vistorias',
            icon: null,
            exportable: true
        }
    },
    {
        path: 'vistorias/visualizar/:id',
        component: VistoriasCadastroComponent,
        title: 'Visualizar vistoria',
        data:<pageHeaderData> {
            description: "Visualize os dados cadastrados",
            buttonLabel: "Voltar",
            routerLink: 'vistorias',
            icon: null,
            exportable: true
        }
    },
    {
        path: 'vistorias/editar/:id',
        component: VistoriasCadastroComponent,
        title: 'Editar vistoria',
        data:<pageHeaderData> {
            description: "Edite os dados cadastrados",
            buttonLabel: "Voltar",
            routerLink: 'vistorias',
            icon: null,
            exportable: true
        }
    },
    {
        path: 'unidades',
        component: UnidadesComponent,
        title: 'Unidades',
        data:<pageHeaderData> {
            description: "Cadastre e gerencie as unidades operacionais da cooperativa.",
            buttonLabel: "Nova unidade",
            routerLink: 'unidades/novo',
            icon: 'LucidePlus',
            exportable: true
        },
        children: [{
            path: 'novo',
            component: UnidadesComponent,
        }]
    },
    {
        path: 'banidos',
        component: BanidosComponent,
        title: 'Motoristas e associados banidos',
        data:<pageHeaderData> {
            description: "Lista negra utilizada nas validações de cadastro.",
            buttonLabel: "Adicionar banimento",
            routerLink: 'banidos/novo',
            icon: 'LucidePlus',
            exportable: true
        },
        children: [{
            path: 'novo',
            component: BanidosComponent,
        }]
    },
    {
        path: 'ocorrencias',
        component: OcorrenciasComponent,
        title: 'Ocorrências',
        data:<pageHeaderData> {
            description: "Registro de eventos operacionais reportados pelos diretores.",
            buttonLabel: "Nova ocorrência",
            routerLink: 'ocorrencias/novo',
            icon: 'LucidePlus',
            exportable: true
        },
        children: [{
            path: 'novo',
            component: OcorrenciasComponent,
        }]
    },
    {
        path: 'usuarios',
        component: UsuariosComponent,
        title: 'Usuários e permissões',
        data:<pageHeaderData> {
            description: "Crie diretores e operadores, defina perfis de acesso e gerencie credenciais.",
            buttonLabel: "Novo usuário",
            routerLink: 'usuarios/novo',
            icon: 'LucidePlus',
            exportable: true
        },
        children: [{
            path: 'novo',
            component: UsuariosComponent,
        }]
    },
    {
        path: 'configuracoes',
        component: ConfiguracoesComponent,
        title: 'Configurações',
        data: <pageHeaderData> {
            description: "Preferências da cooperativa, integrações e regras operacionais.",
        } 
    }
];

