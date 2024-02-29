import { useCallback, useEffect, useState } from "react";
import { IAppAsyncStorage, useSafeAsyncStorage } from "shared/store";
import { DEFAULT_SETTINGS } from "./default";
import { copy, isUndefined } from "shared/utils";

type UpdateCallback<T = IAppAsyncStorage["@settings"]> = (settings: T) => T;

export const useLingoSettings = () => {
  const asyncStorage = useSafeAsyncStorage("@settings");
  const [settings, setSettings] = useState<IAppAsyncStorage["@settings"] | null>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchSettings = () => {
    setIsLoading(true);
    asyncStorage
      .get()
      .then((settings) => {
        if (!validateSettings(settings)) {
          asyncStorage.set(DEFAULT_SETTINGS).then(() => fetchSettings());
        } else {
          setSettings(settings);
          setIsLoading(false);
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const update = useCallback(
    (callback: UpdateCallback): void => {
      if (!settings) return;

      const settingsCopy = copy(settings);

      const updatedCopy = callback(settingsCopy);

      asyncStorage.set(updatedCopy).then(() => setSettings(updatedCopy));
    },
    [settings],
  );

  const reload = () => {
    fetchSettings();
  };

  return {
    update,
    settings,
    isLoading,
    reload,
  };
};

function validateSettings(
  settings: IAppAsyncStorage["@settings"] | null | undefined,
): settings is IAppAsyncStorage["@settings"] {
  if (!settings) return false;

  if (isUndefined(settings.basicDeck)) return false;

  if (isUndefined(settings.sortTypeInSession)) return false;

  return true;
}
