import { Type } from "@angular/core";
import { LucideIcon, LucideIconInput } from "@lucide/angular";

export interface MenuItem {
    name?: string | null,
    profileName?: string | null,
    profileMail?: string | null,
    label: string,
    path?: string,
    icon: LucideIconInput,
    children?: MenuItem[];
}