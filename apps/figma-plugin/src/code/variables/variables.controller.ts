import { MessageListener } from "../../common/message/message-listen";
import { VariablesService } from "./variables.service";

export class VariablesController {
  constructor(private readonly variablesService: VariablesService) {
    this.getVariablesCollections();
  }

  getVariablesCollections() {
    MessageListener.get("/variables/collections", () => {
      return this.variablesService.getVariablesCollections();
    });
  }
}
