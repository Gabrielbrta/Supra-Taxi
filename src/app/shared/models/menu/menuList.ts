import { LucideIconData } from "lucide-angular";

export interface MenuItem {
    name?: string | null,
    profileName?: string | null,
    profileMail?: string | null,
    label: string,
    path?: string,
    icon: LucideIconData,
    children?: MenuItem[];
}