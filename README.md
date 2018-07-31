# redux-store-manager
Declaratively code-split your redux store and make containers own entire redux flow using redux-store-manager

## Installation
```sh
yarn add redux-store-manager
```

## Problem
1. rootReducer is traditionally created manually using combineReducers and this makes code-splitting reducers based on how widgets consuming their data are loaded(whether they are in the main bundle or on-demand bundles) hard.
2. Bundler cant tree-shake or dead code eliminate the rootReducer to not include reducers whose data is not consumed by any container components

## Solution
1. Let the containers that are going to consume the data stored by a reducer and trigger actions take responsibility of adding a reducer to the store.
This makes the container owning the entire redux flow by linking
    - **Actions** as component props via **mapDispatchToProps**
    - **Reducer** responsible for updating the data via **storeManager.registerReduers**
    - **Data** as component props via **mapStateToProps**
2. Use the redux store's replaceReducer API whatever reducers are registered when an on-demand chunk loads the store gets refreshed with the new rootReducer.

## Documentation
**storeManager** is a singleton that has the following methods
### 1. storeManager.registerReducers(reducerMap)
- reducerMap is an object with reducer namespaces as keys and reducer definitions as values (similar to the object you pass to combineReducers).
- This method is used in container components to register the reducer on the store to be created.

### 2. storeManager.createStore(initialState, storeEnhancer)
- createStore method takes the same arguments that createStore function of redux library without the rootReducer argument.
- createStore is called to pass the store prop to <Provider /> component.
- both the initialState, storeEnhancer are optional.

### 3. storeManager.refreshStore()
- refreshStore is called when the on-demand build chunk is loaded, to replace the rootReducer of the store.
- The refreshed store will include the registered reducers in the on-demand chunk that was just loaded.

## Example of usage in a React app

Root.js
```js
import {Provider} from 'react-redux';
import storeManager from 'redux-store-manager';
import App from './containers/AppContainer';

export default function Root() {
  return (
    // creates store with all the reducers registered by container components
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
import {withRefreshedStore} from 'redux-store-manager';
import SimpleWidgetContainer from './containers/SimpleWidgetContainer';

export default class App extends React {
  state = {
    OnDemandWidgetContainer: null
  };
  componentWillMount() {
    // when loading a widget on-demand along with the component codebase the reducers are also
    withRefreshedStore(import('./containers/SimpleWidgetContainer')).then((module) => {
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

/*
 * reducers registered in on-demand chunks will be added to redux store
 * only when the on-demand chunk is loaded
 */
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
