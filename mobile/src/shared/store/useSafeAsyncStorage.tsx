import { asyncStorageApi } from "./api";
import { IAppAsyncStorage } from "./type";

export const useSafeAsyncStorage = function <T>(key: keyof IAppAsyncStorage) {
  const get = async () => {
    return await asyncStorageApi.get<T>(key);
  };

  const set = async (value: T) => {
    await asyncStorageApi.set(key, value);
  };

  const remove = async () => {
    await asyncStorageApi.remove(key);
  };

  const merge = async (value: T) => {
    await asyncStorageApi.merge(key, value);
  };

  return {
    get,
    set,
    remove,
    merge,
  };
};
