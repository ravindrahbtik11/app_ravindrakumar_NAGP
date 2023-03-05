import { Component, Input, Output, EventEmitter, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { AuthService } from '../../../auth.service';

/**
 * This class represents the lazy loaded SFSFileUploaderComponent.
 */

@Component({
    moduleId: module.id,
    selector: 'eca-file-uploader',
    templateUrl: 'eca-file-uploader.component.html',
    styleUrls: ['eca-file-uploader.component.css']
})

export class ECAFileUploaderComponent implements OnInit {
    @Input() isDragable: boolean;
    @Input() uploadUrl: string;
    @Input() allowFileType: string[];
    @Input() selectedFiscalYear: any;
    @Input() selectedFileType: any;
    @Input() selectedMonth: any;
    @Input() uploadType: any;
    @Input() selectedTypePhase: any;
    @Input() selectedBranchId: any;
    @Input() selectedInsurer: string;
    @Input() headerList: any;
    @Input() phaseStatus: string;
    @Input() downloadBtnText: string = '';
    @Input() importType: any;

    @Output() viewErrorDetailHandler: EventEmitter<any> = new EventEmitter<any>();
    @Output() uploadValidationHandler: EventEmitter<any> = new EventEmitter<any>();
    @Output() uploadCompleteHandler: EventEmitter<any> = new EventEmitter<any>();
    @Output() resetFieldsHandler: EventEmitter<any> = new EventEmitter<any>();
    uploadItem: any;
    validationMessages: any;
    uploader: FileUploader;
    isClearData: boolean;
    selectedFileName: string;
    isForceUpdate: boolean;
    isCompleted: boolean;
    @ViewChild('fileUploaderInput') fileInput: any;
    @ViewChild('progressbar') progressContainer: any;
    @ViewChild('uploadFile') uploadFileInput: any;
    hasBaseDropZoneOver: boolean;
    hasAnotherDropZoneOver: boolean;
    acceptType: string;

    constructor(private authService: AuthService) {
    }

    // Handled on init life cycle hooks
    ngOnInit() {
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
        this.isCompleted = false;
        this.isClearData = false;
        this.isDragable = true;
        this.validationMessages = [];
        const self = this;
        this.setAcceptFileType();
        this.setUploaderSettings(this.uploadUrl);
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            this.authService.loaderEmitter.emit(false);
            if (response) {
                this.isForceUpdate = false;
                const data = JSON.parse(response);
                if (data) {
                    this.uploadComplete(data);
                }
            }
        };
    }

    // Method use to handle uploader after file adding event
    public onUploaderAfterAddingFile() {
        if (this.onUploaderWhenAddingFileFailed()) {
            this.isCompleted = false;
            this.uploader.options.url = this.uploadUrl;
            if (this.fileInput.nativeElement && this.fileInput.nativeElement.value) {
                if (this.uploader.queue.length > 0) {
                    this.uploadFileInput.nativeElement.value = this.uploader.queue[0].file.name;
                }
            }

            if (this.uploader.queue.length > 1) {
                this.uploader.queue[0].remove();
                const url = this.fileInput.nativeElement.value;
                this.reset();
                if (url && url.length > 0) {
                    this.uploadFileInput.nativeElement.value = this.uploader.queue[0].file.name;
                }
            }
            if (this.uploader.queue.length > 0) {
                this.selectedFileName = this.uploader.queue[0].file.name + '';
                if (this.uploadFileInput.nativeElement) {
                    this.uploadFileInput.nativeElement.value = this.uploader.queue[0].file.name;
                }
            }
        }
    }

    // Method use to handle onUploaderWhenAddingFileFailed event
    public onUploaderWhenAddingFileFailed() {
        let isValid:boolean;
        isValid = false;
        if (this.uploader.queue && this.uploader.queue.length > 0) {
            isValid = this.displayWarnings(this.uploader.queue[this.uploader.queue.length - 1].file.name + '');
        }
        return isValid;
    }

    // method use to handle file over on drag drop
    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    // Method use to remove Item
    public removeItem(item: any) {
        item.remove();
        this.reset();
        this.resetFieldsHandler.emit();
    }

    // Method to handle file over for another event file on drag drop box.
    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }

    // Method use to upload data
    public uploadData(item: any) {
        this.uploadItem = item;
        let isSelected: boolean;
        isSelected = false;
        this.isCompleted = false;
        const isValid = this.validateDataType();
        if (isValid) {
            if (this.uploadUrl && this.uploadUrl.length > 0) {
                item.url = this.uploadUrl;
                this.authService.loaderEmitter.emit(true);
                item.upload();
            }
        }
    }


    // Method use to validate the input fields
    public validateDataType() {
        let isValid: boolean;
        isValid = true;
        this.uploadValidationHandler.emit(true);
        return isValid;
    }

    // Method use handle upload complete event
    public uploadComplete(responseData: any) {
        this.isCompleted = true;
        this.authService.stopLoader();
        this.removeItem(this.uploadItem);
        let result: any;
        result = {
            dataList: responseData.errors ? responseData.errors : [],
            errorCode: 'OK',
            message: ('Uploaded succeefully'),
            detail : (responseData ? responseData : []),
        };

        this.validationMessages = result;
        this.uploadCompleteHandler.emit(result);
    }

    // Method use to emit the view error if error occurred
    public viewErrorDetail(eve: any) {
        this.viewErrorDetailHandler.emit(eve);
    }


    // Method use to reset error
    public resetError() {
        this.isCompleted = false;
        this.reset();
    }

    public dropped(item: any) {
        if (item && item.length > 0) {
            if (!this.displayWarnings(item[0].name)) {
                item = null;
            }
        }
    }

    // Method use to reset the fields
    private reset() {
        if (this.progressContainer && this.progressContainer.nativeElement) {
            this.progressContainer.nativeElement.style.width = '0px';
        }
        if (this.uploadFileInput && this.uploadFileInput.nativeElement) {
            this.uploadFileInput.nativeElement.value = '';
        }

        this.validationMessages = null;
        this.selectedFileName = '';
        if (this.fileInput.nativeElement.files && this.fileInput.nativeElement.files.length > 0) {
            this.fileInput.nativeElement.value = '';
            this.uploadFileInput.nativeElement.value = this.fileInput.nativeElement.value;
        }
    }


    // Method use to set Accept File type
    private setAcceptFileType() {
        this.acceptType = '';
        const fileType: any = this.allowFileType ? this.allowFileType : 'jpeg';
        if (fileType && fileType.length > 0) {
            fileType.forEach(element => {
                if (this.acceptType.length === 0) {
                    this.acceptType = '.' + element;
                } else {
                    this.acceptType += ',.' + element;
                }

            });
        }
    }

    // Method use to set uploader settings
    private setUploaderSettings(url: string) {
        const self = this;
        this.isForceUpdate = false;
        const fileType: any = this.allowFileType ? this.allowFileType : 'jpeg';

        this.uploader = new FileUploader({
            url: url,
        });


        this.uploader.onAfterAddingFile = () => this.onUploaderAfterAddingFile();
        this.uploader.onWhenAddingFileFailed = () => this.onUploaderWhenAddingFileFailed();

        this.uploader.onBeforeUploadItem = (fileItem) => {
            if (self.authService && self.authService.userInfo) {
              
            }
            return fileItem;
        };

        // Adding parameters in header
        this.uploader.onBuildItemForm = function (fileItem, form) {
            if (self.authService && self.authService.userInfo) {
                // form.append('gid', self.authService.userInfo.gid);
                // form.append('locale', self.authService.getCurrentCulture());
            }
        };
    }

    private displayWarnings(fileName: string) {
        const file = fileName.split('.');
        let extension: string;
        extension = '';
        if (file && file.length > 1) {
            extension = file[file.length - 1];
        }
        if (this.allowFileType.indexOf(extension.toLowerCase()) === -1) {
            this.authService.loaderEmitter.emit(false);
            const message =  'Allow only '+ ' ' + this.allowFileType
                + ' ' + 'not allowed';
            if (this.uploader.queue && this.uploader.queue.length > 0) {
                const totalItemLength = this.uploader.queue.length - 1;
                for (let index = totalItemLength; index >= 0; index--) {
                    this.uploader.queue[index].remove();
                    this.reset();
                    this.resetFieldsHandler.emit();
                }
            }
            return false;
        } else {
            return true;
        }
    }
}
