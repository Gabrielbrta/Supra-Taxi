import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { MainLayoutsRoutes } from './layouts/main-layout/main-layout.routes';


export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: MainLayoutsRoutes
    }
];

