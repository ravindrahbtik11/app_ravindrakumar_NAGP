import { Component } from '@angular/core';
import { AppSettings } from 'src/app/app.settings';

@Component({
    moduleId: module.id,
    selector: 'eca-footer',
    templateUrl: 'footer.component.html',
    styleUrls: ['footer.component.css']
})

export class FooterComponent {
    version: string;
    dateYear:any;
    constructor() {
        if (AppSettings != null) {
            this.version = AppSettings.Version;
        }
        this.dateYear = new Date().getFullYear();
    }
}
