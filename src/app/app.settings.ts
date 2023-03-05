export class AppSettings {
    public static get Version(): string { return '1.0'; }
    private static restApiPath: string;
    private static appConfig: any;
    private static base: string;
    public static get Base(): string { return this.base; }
    public static get AllowFileType(): string[] { return ['jpg', 'jpeg', 'png']; }

    public static get Product(): string { return this.restApiPath + 'product'; }

    public static get UploadProduct(): string { return this.restApiPath + 'product/UploadFile'; }

    public static get MenuDataPath(): string { return '/assets/data/menu/menu.json'; }
    public static get ConfigDataPath(): string { return '/assets/config.json'; }
    public static get ToasterErrorTimeOut(): number { return this.appConfig.toasterErrorTimeOut }
    public static get ToasterSuccessTimeOut(): number { return this.appConfig.toasterSuccessTimeOut }





    public static setAppConfig(appConfigData: any) {
        this.appConfig = appConfigData.appConfig;
        this.restApiPath = appConfigData.appConfig.restApiPath;
        if (window.location.origin.includes('localhost')) {

        }
        this.base = appConfigData.appConfig.baseUrl;
    }
}