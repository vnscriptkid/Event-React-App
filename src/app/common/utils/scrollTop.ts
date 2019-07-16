import React, { useEffect, ReactElement } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

interface Props {}

const _ScrollTop: React.SFC<Props & RouteComponentProps> = props => {
  const {
    children,
    location: { pathname }
  } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children as ReactElement;
};

export const ScrollTop = withRouter(_ScrollTop);
