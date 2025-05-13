import { SafeHtml } from "@angular/platform-browser";

export interface Template {
    id : number; 
    name : string;
    description : string;
    thumbnail : string;
    safeThumbnail : SafeHtml;
}
