import { Icons } from "../../icons/icons";

export interface pageHeaderData {
  description: string;
  buttonLabel?: string;
  buttonLink?: string;
  routeLink?: string;
  icon?: keyof typeof Icons | null;
  exportable?: boolean;
}