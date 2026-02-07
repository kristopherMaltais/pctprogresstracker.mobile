import * as SecureStore from "expo-secure-store";
import { SecureStoreService } from "./secureStoreService";

export class SecureStoreServiceImpl implements SecureStoreService {
  async setValue(key: string, value: string): Promise<void> {
    return await SecureStore.setItemAsync(key, value)
      .then(() => {
        return;
      })
      .catch((error) => {
        return error;
      });
  }

  async getValue(key: string): Promise<string> {
    return await SecureStore.getItemAsync(key)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  async deleteValue(key: string): Promise<void> {
    return await SecureStore.deleteItemAsync(key)
      .then(() => {
        return;
      })
      .catch((error) => {
        return error;
      });
  }
}
