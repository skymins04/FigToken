import { VariablesController } from "./variables.controller";
import { VariablesService } from "./variables.service";

export class VariablesModule {
  constructor() {
    new VariablesController(new VariablesService());
  }
}
