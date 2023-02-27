import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ECAHttpService } from './custom-http/eca-http.service';


@Injectable()

export class MenuService {
    menus: any;
    constructor(private http: ECAHttpService) {

    }

    public getMenuDetail(url: string): Observable<any> {
        return this.http.get(url)
        .pipe((response) => {
            return response;
        });
    }
}