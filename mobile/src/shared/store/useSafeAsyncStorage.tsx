import { asyncStorageApi } from "./api";
import { IAppAsyncStorage } from "./storage.interface";

export const useSafeAsyncStorage = function <T extends keyof IAppAsyncStorage = keyof IAppAsyncStorage>(key: T) {
  const get = async () => {
    return await asyncStorageApi.get<IAppAsyncStorage[T]>(key);
  };

  const set = async (value: IAppAsyncStorage[T]) => {
    await asyncStorageApi.set(key, value);
  };

  const remove = async () => {
    await asyncStorageApi.remove(key);
  };

  const merge = async (value: IAppAsyncStorage[T]) => {
    await asyncStorageApi.merge(key, value);
  };

  return {
    get,
    set,
    remove,
    merge,
  };
};
