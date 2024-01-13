declare global {
  export type PartialWithRequired<T, K extends keyof T> = Pick<T, K> &
    Partial<T>;

  type RequireOnly<T, P extends keyof T> = Pick<T, P> & Partial<Omit<T, P>>;

  // type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
  type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

  type NullablePartial<
    T,
    NK extends keyof T = { [K in keyof T]: null extends T[K] ? K : never }[keyof T],
    NP = Partial<Pick<T, NK>> & Pick<T, Exclude<keyof T, NK>>
  > = { [K in keyof NP]: NP[K] }

  export const USER_STATUS = [
    "checking",
    "not-authenticated",
    "authenticated",
  ] as const;
}

export { };
