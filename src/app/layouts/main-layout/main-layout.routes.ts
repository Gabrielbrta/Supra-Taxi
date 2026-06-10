import { Routes } from '@angular/router';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { MotoristasComponent } from '../../pages/motoristas/motoristas.component';
import { AssociadosComponent } from '../../pages/associados/associados.component';
import { UnidadesComponent } from '../../pages/unidades/unidades.component';
import { BanidosComponent } from '../../pages/banidos/banidos.component';
import { OcorrenciasComponent } from '../../pages/ocorrencias/ocorrencias.component';
import { UsuariosComponent } from '../../pages/admin/usuarios/usuarios.component';
import { ConfiguracoesComponent } from '../../pages/configuracoes/configuracoes.component';
import { VistoriasComponent } from '../../pages/vistorias/vistorias.component';

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
            description: "Olá, Jorge. Você tem 7 documentos críticos precisando de atenção hoje.",
            buttonLabel: null,
            icon: null,
            exportable: true,
        }
    },
    {
        path: 'motoristas',
        component: MotoristasComponent,
        title: 'Motoristas',
        data: {
            description: "1.284 motoristas cadastrados — 12 novos nos últimos 30 dias.",
            buttonLabel: "Novo motorista",
            icon: 'Plus',
            exportable: true
        }
    },
    {
        path: 'associados',
        component: AssociadosComponent,
        title: 'Associados',
        data: {
            description: "318 associados — gerencie cadastros, documentos e veículos.",
            buttonLabel: "Novo associado",
            icon: 'Plus',
            exportable: true
        }
    },
    {
        path: 'vistorias',
        component: VistoriasComponent,
        title: 'Vistorias',
        data: {
            description: "Acompanhe vistorias de frota — aprove ou registre reprovações com motivo detalhado.",
            buttonLabel: "Nova vistoria",
            icon: 'Plus',
            exportable: true
        }
    },
    {
        path: 'unidades',
        component: UnidadesComponent,
        title: 'Unidades',
        data: {
            description: "Cadastre e gerencie as unidades operacionais da cooperativa.",
            buttonLabel: "Nova unidade",
            icon: 'Plus',
            exportable: true
        }
    },
    {
        path: 'banidos',
        component: BanidosComponent,
        title: 'Motoristas e associados banidos',
        data: {
            description: "Lista negra utilizada nas validações de cadastro.",
            buttonLabel: "Adicionar banimento",
            icon: 'Plus',
            exportable: true
        }
    },
    {
        path: 'ocorrencias',
        component: OcorrenciasComponent,
        title: 'Ocorrências',
        data: {
            description: "Registro de eventos operacionais reportados pelos diretores.",
            buttonLabel: "Nova ocorrência",
            icon: 'Plus',
            exportable: true
        }
    },
    {
        path: 'usuarios',
        component: UsuariosComponent,
        title: 'Usuários e permissões',
        data: {
            description: "Crie diretores e operadores, defina perfis de acesso e gerencie credenciais.",
            buttonLabel: "Novo usuário",
            icon: 'Plus',
            exportable: true
        }
    },
    {
        path: 'configuracoes',
        component: ConfiguracoesComponent,
        title: 'Configurações',
        data: {
            description: "Preferências da cooperativa, integrações e regras operacionais.",
            buttonLabel: null,
            icon: 'Plus',
            exportable: false
        } 
    }
];

