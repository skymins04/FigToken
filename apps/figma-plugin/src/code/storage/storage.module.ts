import { StorageController } from "./storage.controller";
import { StorageService } from "./storage.service";

export class StorageModule {
  constructor() {
    new StorageController(new StorageService());
  }
}
