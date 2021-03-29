import { Fn } from '@/types/common';
import { debounce } from '@/util';
import { useRef } from 'react';

export const useDebounce = <T extends Fn>(callback: T, delay = 1000) => {
  const callBackRef = useRef<T>(callback);
  callBackRef.current = callback;

  const debounceRef = useRef(
    debounce<T>(delay, ((...args: any[]) => {
      return callBackRef.current(...args);
    }) as T)
  );
  return debounceRef.current;
};
