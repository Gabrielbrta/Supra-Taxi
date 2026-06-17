import { inject, Service } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PageResult } from '../../shared/models/table/Table';
import { TableDataDocuments } from '../../shared/models/dashboard/TableDataDocuments';
import { MOCK_DOCUMENTS } from '../../shared/models/mock-documents';
import { HttpClient } from '@angular/common/http';

@Service()
export class DashboardService {
    private readonly http = inject(HttpClient);
    private readonly STORAGE_KEY = 'dashboards';

    constructor() {
        if(!localStorage.getItem(this.STORAGE_KEY)) {
            this.save(MOCK_DOCUMENTS);
        }
    }

    save(data: PageResult<TableDataDocuments>) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(MOCK_DOCUMENTS))
    }

    // getAllDocuments(): Observable<PageResult<TableDataDocuments>> {
    //     return this.http.get<PageResult<TableDataDocuments>>(
    //         'api/v1/allDocuments'
    //     );
    // }

    getAll(): PageResult<TableDataDocuments> {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if(!data) {
            return {
                data: [],
            }
        }
        return JSON.parse(data);
    }
}
