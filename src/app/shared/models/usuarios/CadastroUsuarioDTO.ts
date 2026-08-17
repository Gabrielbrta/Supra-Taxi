import { StatusEnum } from "../../enums/StatusEnum";
import { PermissionColumn } from "../table/TablePermissions";

export interface CadastroUsuarioDTO {
    id: string;
    nome: string;
    email: string;
    tipoUsuario: string | number;
    status: StatusEnum;
    permissions: PermissionColumn[];
}