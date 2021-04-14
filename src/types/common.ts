export interface requireContextModule<T> {
  readonly default: T;
}

export type Fn = (...args: any) => any;

export type Func<T, R = void> = (data: T) => R;
