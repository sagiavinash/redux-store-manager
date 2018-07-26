# redux-store-manager
A library to assemble redux store enabling container components to own reducers, code splitting and dead code elimination

## Installation
```sh
yarn add redux-store-manager
```

## Problem
1. rootReducer is created manually using combineReducers and this makes code-splitting reducers based on how widgets consuming their data are loaded(whether they are in the main bundle or on-demand bundles) hard.
2. Bundler cant treeshake the rootReducer to not include reducers whose data is not consumed by any container components

## Solution
1. Let the containers that are going to consume the data stored by a reducer and trigger actions take responsibility of adding a reducer to the store.
This makes the container owning the entire redux flow by linking
    - **Actions** as component props via **mapDispatchToProps**
    - **Reducer** responsible for updating the data via **storeManager.registerReduers**
    - **Data** as component props via **mapStateToProps**
2. Use the redux store's replaceReducer API whatever reducers are registered when an on-demand chunk loads the store gets refereshed with the new rootReducer.

## Example of usage in a React app

Root.js
```js
import {Provider} from 'react-redux';
import storeManager from 'redux-store-manager';
import App from './containers/AppContainer';

export default function Root() {
  return (
    <Provider store={storeManager.createStore(initialState, storeEnhancer)}>
      <App>
    </Provider>
  )
}


/* ReactDOM.render(<Root/>, document.getElementById('root')); */
```
App.js

```js
import React, {Component} from 'react';
import storeManager from 'redux-store-manager';
import SimpleWidgetContainer from './containers/SimpleWidgetContainer';

export default class App extends React {
  state = {
    OnDemandWidgetContainer: null
  };
  componentWillMount() {
    // when loading a widget on-demand along with the component codebase the reducers are also
    import('./containers/SimpleWidgetContainer').then((module) => {
      storeManager.refreshStore();

      this.setState({OnDemandWidgetContainer: module.default});
    });
  }
  render() {
    const {OnDemandWidgetContainer} = this.state;

    return (
      <>
        <SimpleWidgetContainer />
        {OnDemandWidgetContainer ? <OnDemandWidgetContainer/> : null}
      </>
    );
  }
}
```

SimpleWidgetContainer.js
```js
import storeManager from 'react-store-manager';
import {connect} from 'react-redux';
import SimpleDemandWidget from '../components/SimpleWidget';
import simpleDemandWidgetReducer from '../reducers/simopleWidgetReducer';
import {getSimpleWidgetData} from '../actions';

// reducer and its initialStatw will be added to the store.
storeManager.registerReducers({
  simpleWidgetData: simpleWidgetDataReducer
});

const mapStateToProps = (state) => ({ simpleWidgetData: state.simpleWidgetData });
const mapDispatchToProps = { getSimpleWidgetData };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnDemandWidget);
```

OnDemandWidgetContainer.js
```js
import storeManager from 'react-store-manager';
import {connect} from 'react-redux';
import OnDemandWidget from '../components/OnDemandWidget';
import onDemandWidgetReducer from '../reducers/onDemandWidgetReducer';
import {getOnDemandWidgetData} from '../actions';

// reducers registered in on-demand chunks will be added to redux store only when the on-demand chunk is loaded
storeManager.registerReducers({
  onDemandWidgetData: onDemandWidgetDataReducer
});

const mapStateToProps = (state) => ({ onDemandWidgetData: state.onDemandWidgetData });
const mapDispatchToProps = { getOnDemandWidgetData };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OnDemandWidget);
```
