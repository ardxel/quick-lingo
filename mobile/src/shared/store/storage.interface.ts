import { IDeck } from "shared/models";

export interface IAppAsyncStorage {
  "@decks": Record<string, IDeck>;
}
