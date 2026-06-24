import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { MOTORISTAS_TABLE } from '../../shared/models/Mock-motoristas-table';
import { DataSourceTableMotorista } from '../../shared/models/motoristas/dataSourceTableMotorista';
import { PageResult } from '../../shared/models/table/Table';

@Service()
export class MotoristasService {
    private readonly http = inject(HttpClient);
    private readonly STORAGE_KEY_MOTORISTAS_TABLE = 'motoristas_table'; 

    constructor() {
        if(!localStorage.getItem(this.STORAGE_KEY_MOTORISTAS_TABLE)) {
            this.save(MOTORISTAS_TABLE, this.STORAGE_KEY_MOTORISTAS_TABLE);
        }
    }

    save(data: any, key: any) {
        localStorage.setItem(key, JSON.stringify(data))
    }

    
    // getTableMotoristasPaginado(): Observable<PageResult<DataSourceTableMotorista>> {
    //     return this.http.get<PageResult<DataSourceTableMotorista>>(
    //         'api/v1/motoristas/paginado'
    //     );
    // }

    getTableMotoristasPaginado(): PageResult<DataSourceTableMotorista> {
        const data = localStorage.getItem(this.STORAGE_KEY_MOTORISTAS_TABLE);
        if(!data) {
            return {
                data: [],
            }
        }
        return JSON.parse(data);
    }
}
