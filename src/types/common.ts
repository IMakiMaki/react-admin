export interface requireContextModule<T> {
  readonly default: T;
}

export type Fn = (...args: any) => any;

export type Func<T, R = void> = (data: T) => R;

export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;
