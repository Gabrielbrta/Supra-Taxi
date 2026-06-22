import { Icons } from "../../icons/icons";

export interface PageResult<T> {
    data?: T[],
    paginadora?: paginadora;
}

interface paginadora {
    pageNumber: number;
    pageSize?: number;
    totalCount?: number;
    totalPages?: number;
    hasNextPage?: boolean;
    hasPreviousPage?: boolean
}

export interface ColumnType<T> {
    key: keyof T;
    header: string;
    type?: 'text' | 'date' | 'status' | 'name';
}

export interface TableAction {
    icon:  keyof typeof Icons;
    action: string ;
    tooltip?: string;
}

