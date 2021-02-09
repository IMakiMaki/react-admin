// 映射useReducer中的state => type
type ActionMap<T extends { [key: string]: any }> = {
  [Key in keyof T]: T[Key] extends undefined ? { type: Key } : { type: Key; payload: T[Key] };
};

type ActionKey<T> = keyof ActionMap<T>;

// 导出action对应的类型
export type Action<T> = ActionMap<T>[ActionKey<T>];
