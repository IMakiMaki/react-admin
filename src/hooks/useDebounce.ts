import { Fn } from "@/types/common";
import { debounce } from "@/util";
import { useCallback, useRef } from "react";
import useCreation from "./useCreation";

// export const useDebounce = <T extends Fn>(callback: T, delay = 1000) => {
//   const callBackRef = useRef<T>(callback);
//   callBackRef.current = callback;

//   const debounceRef = useCreation(() => {
//     console.log("execute");
//     return debounce<T>(delay, ((...args: any[]) => {
//       console.log("debounce out");
//       return callBackRef.current(...args);
//     }) as T);
//   }, []);
//   return debounceRef;
// };

export const useDebounce = <T extends Fn>(callback: T, delay = 1000) => {
  const callBackRef = useRef<T>(callback);
  callBackRef.current = callback;

  const debounceRef = useRef(
    debounce<T>(delay, ((...args: any[]) => {
      console.log("debounce out");
      return callBackRef.current(...args);
    }) as T)
  );
  return debounceRef.current;
};
