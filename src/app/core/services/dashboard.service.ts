import { inject, Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PageResult } from '../../shared/models/table/Table';
import { TableDataDocuments } from '../../shared/models/dashboard/TableDataDocuments';
import { MOCK_DOCUMENTS } from '../../shared/models/mock-documents';
import { HttpClient } from '@angular/common/http';
import { InfoCardsData } from '../../shared/models/dashboard/InfoCardsData';
import { INFO_CARDS } from '../../shared/models/mock-info-cards';
import { DASHBOARD_VISTORIAS } from '../../shared/models/mock-dashboard-vistorias';
import { DashboardVistoriaData } from '../../shared/models/dashboard/DashboardVistoriasQuery';
import { DASHBOARD_REGISTERS } from '../../shared/models/Mock-dashboard-registers';
import { DashboardRegistersQuery } from '../../shared/models/dashboard/DashboardRegistersQuery';

@Service()
export class DashboardService {
    private readonly http = inject(HttpClient);
    private readonly STORAGE_KEY = 'dashboards';
    private readonly STORAGE_KEY_INFO = 'dashboard-info-cards';
    private readonly STORAGE_KEY_VISTORIAS = 'dashboard-vistorias';
    private readonly STORAGE_KEY_REGISTERS = 'dashboard-registers';

    constructor() {
        if(!localStorage.getItem(this.STORAGE_KEY)) {
            this.save(MOCK_DOCUMENTS, this.STORAGE_KEY);
        }
        if(!localStorage.getItem(this.STORAGE_KEY_INFO)) {
            this.save(INFO_CARDS, this.STORAGE_KEY_INFO);
        }
        if(!localStorage.getItem(this.STORAGE_KEY_VISTORIAS)) {
            this.save(DASHBOARD_VISTORIAS, this.STORAGE_KEY_VISTORIAS);
        }
        if(!localStorage.getItem(this.STORAGE_KEY_REGISTERS)) {
            this.save(DASHBOARD_REGISTERS, this.STORAGE_KEY_REGISTERS);
        }
    }

    save(data: any, key: any) {

        localStorage.setItem(key, JSON.stringify(data))
    }

    // getAllDashDocuments(): Observable<PageResult<TableDataDocuments>> {
    //     return this.http.get<PageResult<TableDataDocuments>>(
    //         'api/v1/dashboard/documents'
    //     );
    // }
    // getAllDashInfoCards(): Observable<InfoCardsData> {
    //     return this.http.get<InfoCardsData>(
    //         'api/v1/dashboard/info-card'
    //     );
    // }
    // getAllDashVistorias(): Observable<PageResult<DashboardVistoriaData>> {
    //     return this.http.get<DashboardVistoriaData>(
    //         'api/v1/dashboard/vistorias'
    //     );
    // }
    // getAllDashRegisters(): Observable<PageResult<DashboardRegistersQuery>> {
    //     return this.http.get<DashboardRegistersQuery>(
    //         'api/v1/dashboard/registers'
    //     );
    // }

    getAllDocuments(): PageResult<TableDataDocuments> {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if(!data) {
            return {
                data: [],
            }
        }
        return JSON.parse(data);
    }
    getAllVistorias(): PageResult<DashboardVistoriaData> {
        const data = localStorage.getItem(this.STORAGE_KEY_VISTORIAS);
        if(!data) {
            return {
                data: [],
            }
        }
        return JSON.parse(data);
    }
    getAllRegisters(): PageResult<DashboardRegistersQuery> {
        const data = localStorage.getItem(this.STORAGE_KEY_REGISTERS);
        if(!data) {
            return {
                data: [],
            }
        }
        return JSON.parse(data);
    }
    getInfoCards(): InfoCardsData {
        const data = localStorage.getItem(this.STORAGE_KEY_INFO);
        if(!data) {
            return {
                data: [],
            }
        }
        return JSON.parse(data);
    }

}
