import { MatButtonAppearance } from "@angular/material/button";
import { Icons } from "../../icons/icons";

export interface pageHeaderData {
  description: string;
  buttonLabel?: string;
  buttonLink?: string;
  buttonType?: MatButtonAppearance;
  routeLink?: string;
  icon?: keyof typeof Icons | null;
  exportable?: boolean;
}