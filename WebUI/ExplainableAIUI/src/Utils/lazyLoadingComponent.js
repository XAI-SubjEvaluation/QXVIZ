import React, { Component, Suspense } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function lazyLoadingComponent(getComponent) {
  class AsyncComponent extends Component {
    static Component = null;
    state = { Component: undefined };

    UNSAFE_componentWillMount() {
      if (!this.state.Component) {
        getComponent().then((Component) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }
    render() {
      const { Component } = this.state;
      if (Component) {
        return (
          <Suspense fallback={<CircularProgress />}>
            <Component {...this.props} />
          </Suspense>
        );
      }
      return null;
    }
  }
  return AsyncComponent;
}
