export class AppSettings {
    public static get Version(): string { return '1.0'; }

    public static get MenuDataPath(): string { return '/assets/data/menu/menu.json'; }
    public static get ConfigDataPath(): string { return '/assets/config.json'; }
    public static get ToasterErrorTimeOut(): number { return 10 }
    public static get ToasterSuccessTimeOut(): number { return 5 }
}