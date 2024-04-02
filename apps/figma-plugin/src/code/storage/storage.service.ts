export class StorageService {
  async getFigmaStorage(key: string) {
    const storage = await figma.clientStorage.getAsync(key);
    return storage;
  }

  async getFigmaStorageKeys() {
    const keys = await figma.clientStorage.keysAsync();
    return keys;
  }

  async setFigmaStorage(key: string, data: any) {
    await figma.clientStorage.setAsync(key, data);
  }

  async deleteFigmaStorage(key: string) {
    await figma.clientStorage.deleteAsync(key);
  }
}
