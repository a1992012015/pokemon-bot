import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

import { BaseComponent } from '../../base-class/should-component-update';
import { injectReducer } from '../../redux';

/**
 * Dynamically injects a reducer
 *
 * @param {function} reducer A reducer that will be injected
 *
 */
export const injectReducerWrap = (reducer) => {
  return WrappedComponent => {
    class ReducerInjector extends BaseComponent {
      static WrappedComponent = WrappedComponent;

      constructor(props) {
        super(props);
        injectReducer(reducer);
      }

      render() {
        return <WrappedComponent {...this.props}/>;
      }
    }

    return hoistNonReactStatics(ReducerInjector, WrappedComponent);
  };
};
