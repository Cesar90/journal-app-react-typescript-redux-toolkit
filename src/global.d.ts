declare global {
  export type PartialWithRequired<T, K extends keyof T> = Pick<T, K> &
    Partial<T>;

  type RequireOnly<T, P extends keyof T> = Pick<T, P> & Partial<Omit<T, P>>;

  export const USER_STATUS = [
    "checking",
    "not-authenticated",
    "authenticated",
  ] as const;
}

export {};
