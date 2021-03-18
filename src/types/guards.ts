import React from "react";

type RouteComponent = React.LazyExoticComponent<React.FC<{}>> | React.FC<{}>;

export interface Route {
  readonly guards?: Symbol[];
  readonly hidden?: Boolean;
  readonly path: string;
  readonly component: RouteComponent;
  readonly children?: Route[];
  readonly exact?: Boolean;
}

export interface Guard {
  readonly type: Symbol;
  readonly check: (route: Route) => Promise<boolean | RouteComponent>;
}
