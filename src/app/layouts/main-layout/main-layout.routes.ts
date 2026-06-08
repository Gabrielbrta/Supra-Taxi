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
        component: DashboardComponent
    },
    {
        path: 'motoristas',
        component: MotoristasComponent
    },
    {
        path: 'associados',
        component: AssociadosComponent
    },
    {
        path: 'vistorias',
        component: VistoriasComponent
    },
    {
        path: 'unidades',
        component: UnidadesComponent
    },
    {
        path: 'banidos',
        component: BanidosComponent
    },
    {
        path: 'ocorrencias',
        component: OcorrenciasComponent
    },
    {
        path: 'usuarios',
        component: UsuariosComponent
    },
    {
        path: 'configuracoes',
        component: ConfiguracoesComponent 
    }
];

