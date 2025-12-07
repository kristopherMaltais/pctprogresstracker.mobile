export enum SecureStoreKey {
  USER_LANGUAGE = "userLanguage",
  USER_DISPLAYED_THEME = "userDisplayTheme",
}

export interface SecureStoreService {
  setValue: (key: string, value: string) => void;
  getValue: (key: string) => Promise<string>;
  deleteValue: (key: string) => void;
}
