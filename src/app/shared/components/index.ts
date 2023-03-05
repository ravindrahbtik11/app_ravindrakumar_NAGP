import { ECAFileUploaderComponent } from "./file-uploader/eca-file-uploader.component";
import { FooterComponent } from "./footer/footer.component";
import { MenuComponent } from "./menu/menu.component";
import { ToolbarComponent } from "./toolbar/toolbar.component";

export const SHARED_COMPONENTS: any[] = [
  ToolbarComponent,
  FooterComponent,
  MenuComponent,
  ECAFileUploaderComponent
];

export * from "./footer/footer.component";
export * from "./menu/menu.component";
export * from "./toolbar/toolbar.component";
export * from  "./file-uploader/eca-file-uploader.component";