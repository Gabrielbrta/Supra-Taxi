import { Moment } from "moment";
import { StatusEnum } from "../../enums/StatusEnum";

export interface DocumentosTable {
    documento: string,
    status: StatusEnum,
    upload: Date | Moment
}