import React from 'react';

export enum Routes {
  Inicio = '/inicio',
}

export type RouteLinks = {
  [P in keyof typeof Routes]: React.RefObject<HTMLAnchorElement>;
};

export const routeLinks: RouteLinks = {
  Inicio: React.createRef<HTMLAnchorElement>(),
};

export const LinkContext = React.createContext<RouteLinks>(null);
