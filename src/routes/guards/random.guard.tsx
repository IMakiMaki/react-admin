import { CheckPromiseBack, Route, RouteGuard } from '@/types/route';
import { Singleton } from '@/util/singleton';
import { useState } from 'react';

const RandomGuardComponent = () => {
  const [state, setState] = useState('没有权限Random啊');
  return (
    <div
      onClick={() =>
        setState((prev) => {
          return prev + 'oo';
        })
      }
    >
      {state}
    </div>
  );
};

class RandomGuard extends Singleton implements RouteGuard {
  stayBack = RandomGuardComponent;
  type = Symbol('RANDOM');
  check(route: Route) {
    return new Promise<CheckPromiseBack>((resolve) => {
      if (Math.random() > 0.5) {
        console.log('random pass');
        resolve({ pass: true, allClear: () => <>权限通过测试</> });
      } else {
        console.log('random fail');
        resolve({ pass: false, stayBack: this.stayBack });
      }
    });
  }
}

export default RandomGuard.getSingletonInstance<RandomGuard>();
