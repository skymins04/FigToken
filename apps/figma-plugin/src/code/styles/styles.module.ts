import { StylesController } from "./styles.controller";
import { StylesService } from "./styles.service";

export class StylesModule {
  constructor() {
    new StylesController(new StylesService());
  }
}
