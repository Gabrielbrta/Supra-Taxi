import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { FORMS_ESCOLARIDADE } from '../../shared/models/Mock-forms-escolaridade';
import { Observable } from 'rxjs';
import { PageResult } from '../../shared/models/table/Table';
import { EscolaridadeQuery } from '../../shared/models/forms/EscolaridadeQuery';

@Service()
export class FormsService {
    private readonly http = inject(HttpClient);
    private readonly STORAGE_KEY_FORM = 'form-escolaridade'; 

    constructor() {
        if(!localStorage.getItem(this.STORAGE_KEY_FORM)) {
           this.save(this.STORAGE_KEY_FORM, FORMS_ESCOLARIDADE)
        }
    }

    save(key: any, data: any ) {
        localStorage.setItem(key, JSON.stringify(data))
    }

    // getEscolaridades(): Observable<PageResult<EscolaridadeQuery>> {
    //      return this.http.get<PageResult<EscolaridadeQuery>>
    //      ('api/v1/form/escolaridade');
    // }

    getEscolaridades(): PageResult<EscolaridadeQuery> {
        const data = localStorage.getItem(this.STORAGE_KEY_FORM)
        if(!data) {
            return {data: []};
        }
         return JSON.parse(data);
    }

}
