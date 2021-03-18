export interface Route {
  guards?: Symbol[];
  hidden?: Boolean;
  path: string;
  component: React.LazyExoticComponent<React.FC<{}>> | React.FC<{}>;
  children?: Route[];
  exact?: Boolean;
}

export interface Guard {
  type: Symbol;
  check: (route: Route) => Promise<boolean>;
}

export interface requireModule {
  default: Guard;
}
