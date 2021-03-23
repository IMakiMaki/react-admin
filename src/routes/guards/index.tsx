import { requireContextModule } from "@/types/common";
import { Route, RouteComponent, RouteGuard } from "@/types/route";
import { isReactLazyComponent } from "@/util";
import React, { useMemo } from "react";

const GuardsContext = (require as any).context("", false, /\.guard\.tsx?$/);
const Guards: requireContextModule<RouteGuard>[] = GuardsContext.keys().map(GuardsContext);

interface Config extends Route {
  guards: Exclude<Route["guards"], undefined>;
}

export const RenderRoute: React.FC<{ component: RouteComponent }> = (props) => {
  const memoizedComponent = useMemo(() => {
    if (isReactLazyComponent(props.component)) {
      return (
        <React.Suspense fallback={<div>Loading...</div>}>
          <props.component />
        </React.Suspense>
      );
    } else {
      return <props.component />;
    }
  }, [props]);
  return memoizedComponent;
};

export const GuardsWrapper = (config: Config) => {
  if (!config.guards.length) {
    return config.component;
  } else {
    return React.lazy(async () => {
      // 查找本次路由需要要的守卫
      return await Promise.all(
        config.guards.map((guardSymbol) => {
          return Guards.find((guard) => {
            return guard.default.type === guardSymbol;
          })?.default.check(config);
        })
      ).then((res) => {
        /**
          过滤掉没有查找到的guard：实际上不会有Array.prototype.find=>undefined的类型 但是为了IDE提示正确 filter一遍
          路由守卫的判断结果有以下几种可能
          1)所有守卫都未通过 或 一部分通过一部分未通过 -> 加载第一个未通过的守卫的stayBack
          2)所有守卫都通过 -> 加载最后一个守卫的allClear
        */
        const GuardsResList = res.filter((res) => res !== undefined);
        const CalcGuardsRes = GuardsResList.reduce<{
          passFlag: boolean;
          component: Array<RouteGuard["stayBack"] | RouteGuard["allClear"]>;
        }>(
          (result, guardRes) => {
            return {
              passFlag: guardRes?.pass || false,
              component: [
                ...result.component,
                guardRes?.pass ? guardRes.allClear : guardRes?.stayBack,
              ],
            };
          },
          { passFlag: true, component: [] }
        );
        if (CalcGuardsRes.passFlag) {
          const component = CalcGuardsRes.component[CalcGuardsRes.component.length - 1];
          return Promise.resolve({
            default: () => <RenderRoute component={component || config.component} />,
          });
        } else {
          const component = CalcGuardsRes.component[0];
          return Promise.resolve({
            default: () => <RenderRoute component={component || config.component} />,
          });
        }
      });
    });
  }
};
