import { Component } from "@angular/core";

@Component({
    selector: 'eca-registration',
    moduleId: module.id,
    templateUrl: 'registration.component.html',
    styleUrls: ['registration.component.css']
})

export class RegistrationComponent {
    gender:string;
    model:any;
    constructor(){
        this.gender = 'male';
        this.model = {};
    }
}