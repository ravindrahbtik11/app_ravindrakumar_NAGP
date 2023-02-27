import { ECAHttpService } from './custom-http/eca-http.service';
import { MenuService } from './menu.service';

export const SHARED_PROVIDERS: any[] = [
MenuService,
ECAHttpService
];


export * from './custom-http/eca-http.service';
export * from './menu.service';
