import { Fn } from '@/types/common';
import { useEffect, useRef } from 'react';

/**
 * 本来想实现类似于vue中eventBus的功能（同一个接收不同eventType的emitter，再传递给不同的监听者）
 * 后来想了想，这样在代码中难以得到ts类型提示，而且组件里用得多了会显得很乱
 * 还是学习ahooks的设计思路 单个实例只能传递一个事件
 * https://ahooks.js.org/zh-CN/hooks/advanced/use-event-emitter
 */

interface EventEmitterOption {
  subscription: Set<Fn>;
}

export const useEventEmitterMy = () => {
  const ref = useRef<EventEmitterOption>({
    subscription: new Set(),
  });
  const instanceRef = useRef<{ useSubscription: Fn; emit: Fn }>();
  const emit = <T>(data?: T) => {
    console.log(data, 'emit');
    ref.current.subscription.forEach((fn) => {
      fn(data);
    });
  };
  const useSubscription = (fn: Fn) => {
    ref.current.subscription.add(fn);
  };
  return (instanceRef.current = { useSubscription, emit });
};

type Subscription<T> = (val: T) => void;

export class EventEmitter<T> {
  private subscriptions = new Set<Subscription<T>>();

  emit = (val: T) => {
    for (const subscription of Array.from(this.subscriptions)) {
      subscription(val);
    }
  };

  useSubscription = (callback: Subscription<T>) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const callbackRef = useRef<Subscription<T>>();
    callbackRef.current = callback;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      function subscription(val: T) {
        if (callbackRef.current) {
          callbackRef.current(val);
        }
      }
      this.subscriptions.add(subscription);
      return () => {
        this.subscriptions.delete(subscription);
      };
    }, []);
  };
}

export default function useEventEmitter<T = void>() {
  const ref = useRef<EventEmitter<T>>();
  if (!ref.current) {
    ref.current = new EventEmitter();
  }
  return ref.current;
}
