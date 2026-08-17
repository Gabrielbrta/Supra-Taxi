export type PermissionKey = 'visualizar' | 'cadastrar' | 'editar' | 'tudo';

export interface PermissionColumn {
  key: PermissionKey;
  label: string;
}

export interface PermissionRow {
  modulo: string;
  visualizar: boolean;
  cadastrar: boolean;
  editar: boolean;
  tudo: boolean;
}