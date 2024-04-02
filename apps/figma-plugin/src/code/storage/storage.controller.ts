import { BAD_REQUEST_ERROR } from "@common/message/message-constant";
import { MessageListener } from "../../common/message/message-listen";
import { StorageService } from "./storage.service";

export class StorageController {
  constructor(private readonly storageService: StorageService) {
    this.getStorage();
    this.getStorageKeys();
    this.postStorage();
    this.deleteStorage();
  }

  getStorage() {
    MessageListener.get("/storage", async (body) => {
      if (typeof body?.key !== "string") throw BAD_REQUEST_ERROR;

      return this.storageService.getFigmaStorage(body.key);
    });
  }

  getStorageKeys() {
    MessageListener.get("/storage/keys", async () => {
      return this.storageService.getFigmaStorageKeys();
    });
  }

  postStorage() {
    MessageListener.post("/storage", async (body) => {
      if (typeof body?.key !== "string" || body?.data === undefined)
        throw BAD_REQUEST_ERROR;

      await this.storageService.setFigmaStorage(body.key, body.data);
    });
  }

  deleteStorage() {
    MessageListener.delete("/storage", async (body) => {
      if (typeof body?.key !== "string") throw BAD_REQUEST_ERROR;

      await this.storageService.deleteFigmaStorage(body.key);
    });
  }
}
