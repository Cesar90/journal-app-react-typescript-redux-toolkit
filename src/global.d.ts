declare global {
  export type PartialWithRequired<T, K extends keyof T> = Pick<T, K> &
    Partial<T>;

  export const USER_STATUS = [
    "checking",
    "not-authenticated",
    "authenticated",
  ] as const;
}

export {};
