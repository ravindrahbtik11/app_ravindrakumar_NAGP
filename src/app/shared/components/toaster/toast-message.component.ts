import { Component } from '@angular/core';
import { Toast, ToasterConfig, ToasterService, ToastType } from 'angular2-toaster';
import { AppSettings } from 'src/app/app.settings';

import { ToastMesssageType } from './toast-message-type';

/**
 * This class represents the toast master component.
 */

@Component({
    moduleId: module.id,
    selector: 'eca-toast-message',
    template: `<toaster-container id="tstMessage" [toasterconfig]="toasterConfig"></toaster-container>`,
    styleUrls: ['./toast-message.component.css']

})

// Class represent toast master component
export class ToastMessageComponent {

    // Initializing toaster config
    public toasterConfig: ToasterConfig =
        new ToasterConfig({
            animation: 'fade',
            tapToDismiss: true,
            showCloseButton: { 'warning': true, 'error': false },
            timeout: -1,
            mouseoverTimerStop: false,
        });

    constructor(private toasterService: ToasterService) { }

    // Method use to display toast message
    public toastMessage(messageType: ToastMesssageType, message: string) {
        const timeOut = (messageType === ToastMesssageType.Error ? AppSettings.ToasterErrorTimeOut : AppSettings.ToasterSuccessTimeOut);
        this.toasterService.clear();
        this.toasterConfig.timeout = timeOut;
        this.toasterService.pop(this.setToastValues(messageType, message));

        const self = this;
        setTimeout(() => {
            self.toasterService.clear();
        }, timeOut);
    }

    // Method use to handle toast message with callback
    public toastMessageWithCallback(messageType: ToastMesssageType, message: string, callBack: string) {
        this.toasterService.pop(this.setToastValues(messageType, message));
    }

    // Method use to set configuration of toast
    private setToastValues(messageType: ToastMesssageType, messageBody: string) {
        const type = messageType.toString() as ToastType;
        const toast: Toast = {
            type: type,
            body: messageBody,
            showCloseButton: true,
        };
        return toast;
    }
}
