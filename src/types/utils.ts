export type DeepRequired<T> = {
  [K in keyof T]-?: T[K] extends object
    ? T[K] extends () => void
      ? T[K]
      : DeepRequired<T[K]>
    : T[K];
};