/**
 * 映射useReducer中的state => type
 */
type ActionMap<T extends { [key: string]: any }> = {
  [Key in keyof T]: T[Key] extends undefined ? { type: Key } : { type: Key; payload: T[Key] };
};

type ActionKey<T> = keyof ActionMap<T>;

// 导出action对应的类型
export type Action<T> = ActionMap<T>[ActionKey<T>];

/**
 * @example 用法示意
 */
// const data = {
//   a: 1,
//   b: '2',
//   c: { type: 'c' },
// };

// function set(action: Action<typeof data>) {}

// set({ type: 'a', payload: 2 });
