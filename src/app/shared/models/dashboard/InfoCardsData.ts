import { Icons } from "../../icons/icons";
import { cardStatusType } from "../cards/cardTypes";

export interface InfoCardsData {
    data: infoCard[]
}

interface infoCard {
    title?: number | string,
    description?: string
    typeIconStatus?: keyof cardStatusType,
    icon?: keyof typeof Icons,
    stats?: string | number,
    statsIcon?: keyof typeof Icons,
}