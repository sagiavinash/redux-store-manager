import { createStore, combineReducers } from 'redux';

const reduceReducers = (reducers) => (state, action) =>
  reducers.reduce((result, reducer) => (
    reducer(result, action)
  ), state);

const storeManager = {
  store: null,
  reducerMap: {},
  registerReducer(reducerMap) {
    Object.entries(reducerMap).foreach(([name, reducer]) => {
      if (!this.reducerMap[name]) this.reducerMap[name] = [];

      this.reducerMap[name].push(reducer);
    });
  },
  createRootReducer() {
    return (
      combineReducers(Object.keys(this.reducerMap).reduce((result, key) => Object.assign(result, {
        [key]: reduceReducers(this.reducerMap[key]),
      }), {}))
    );
  },
  createStore(...args) {
    this.store = createStore(this.createRootReducer(), ...args);

    return this.store;
  },
  refreshStore() {
    this.store.replaceReducer(this.createRootReducer());
  },
};

export default storeManager;
