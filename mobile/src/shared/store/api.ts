import AsyncStorage from "@react-native-async-storage/async-storage";

class AsyncStorageApi {
  private readonly asyncStorage = AsyncStorage;

  public async get<T>(key: string): Promise<T | undefined> {
    try {
      const value = await this.asyncStorage.getItem(key);

      if (!value) return undefined;

      const parsed = JSON.parse(value) as T;

      return parsed;
    } catch (error) {
      console.error(error);
    }
  }

  public async set<T>(key: string, value: T): Promise<void> {
    try {
      let str = this.stringify(value);

      await this.asyncStorage.setItem(key, str);
    } catch (error) {
      console.error(error);
    }
  }

  public async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }

  public async merge<T>(key: string, value: T) {
    try {
      let str = this.stringify(value);

      await AsyncStorage.mergeItem(key, str);
    } catch (error) {
      console.error(error);
    }
  }

  public async clear() {
    try {
      await this.asyncStorage.clear();
    } catch (error) {
      console.error(error);
    }
  }

  private stringify(value: unknown): string {
    if (typeof value === "string") return value;
    else return JSON.stringify(value);
  }
}

export const asyncStorageApi = new AsyncStorageApi();
