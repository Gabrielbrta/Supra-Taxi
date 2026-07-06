import { Icons } from "../../icons/icons";

export interface PageResult<T> {
    data?: T[],
    paginadora?: paginadora;
    status?: status;
}

export interface paginadora {
    pageNumber: number;
    pageSize?: number;
    totalCount?: number;
    totalPages?: number;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean
}

interface status {
    status: boolean;
    message: string; 
}

export interface ColumnType<T> {
    key: keyof T;
    header: string;
    type?: 'text' | 'date' | 'status' | 'name' | 'cpf' | 'cnh' | 'tel';
}

export interface TableAction {
    icon:  keyof typeof Icons;
    action: string ;
    tooltip?: string;
}

