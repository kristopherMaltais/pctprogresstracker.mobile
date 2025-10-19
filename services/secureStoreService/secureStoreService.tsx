export enum SecureStoreKey {
  USER_LANGUAGE = "userLanguage",
}

export interface SecureStoreService {
  setValue: (key: string, value: string) => void;
  getValue: (key: string) => Promise<string>;
  deleteValue: (key: string) => void;
}
