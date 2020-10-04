import React from 'react';

export enum Routes {
  Home = '/',
  Empresa = '/Empresa',
  Apoiando = '/Apoiando',
}

export type RouteLinks = {
  [P in keyof typeof Routes]: React.RefObject<HTMLAnchorElement>;
};

export const routeLinks: RouteLinks = {
  Home: React.createRef<HTMLAnchorElement>(),
  Empresa: React.createRef<HTMLAnchorElement>(),
  Apoiando: React.createRef<HTMLAnchorElement>(),
};

export const LinkContext = React.createContext<RouteLinks>(null);
