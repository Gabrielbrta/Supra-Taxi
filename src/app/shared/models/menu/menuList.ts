import { Type } from "@angular/core";
import { LucideIcon } from "@lucide/angular";

export interface MenuItem {
    name?: string | null,
    profileName?: string | null,
    profileMail?: string | null,
    label: string,
    path?: string,
    icon: Type<unknown>,
    children?: MenuItem[];
}