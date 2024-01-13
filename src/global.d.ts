declare global {
  export type PartialWithRequired<T, K extends keyof T> = Pick<T, K> &
    Partial<T>;

  type RequireOnly<T, P extends keyof T> = Pick<T, P> & Partial<Omit<T, P>>;

  type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
  type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

  export const USER_STATUS = [
    "checking",
    "not-authenticated",
    "authenticated",
  ] as const;
}

export { };
