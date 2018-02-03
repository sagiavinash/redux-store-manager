import {getAsyncTaskActionTypes} from './async-task-actions';

export function initialStateReducer({query = null, data = null, isLoading = true} = {}) {
  const initialState = {
    query,
    data,
    isLoading,
    error: null,
    cache: {}
  };

  return (state = initialState) => state;
}

export function queryReducer(asyncTaskId) {
  const actionTypes = getAsyncTaskActionTypes(asyncTaskId);

  return (state, action) => (
    (action.type === actionTypes.start) ? Object.assign({}, state, {
      query: action.meta
    }) : state
  );
}

export function isLoadingReducer(asyncTaskId) {
  const actionTypes = getAsyncTaskActionTypes(asyncTaskId);

  return (state, action) => {
    switch (action.type) {
      case actionTypes.start: {
        return Object.assign({}, state, {
          isLoading: true
        });
      }
      case actionTypes.end: {
        if (action.meta === state.query) {
          return Object.assign({}, state, {
            isLoading: false
          });
        }
      }
      default: return state
    }
  }
}

export function dataReducer(asyncTaskId, transformActionToData = (payload) => payload) {
  const actionTypes = getAsyncTaskActionTypes(asyncTaskId);

  return (state, action) => {
    const isEndAction = (action.type === actionTypes.end);
    const isLatestQuery = (action.meta === state.query);
    const shouldUpdateData = (isEndAction && isLatestQuery)

    return shouldUpdateData ? Object.assign({}, state, {
      data: transformData(action.payload, action.meta)
    }) : state;
  }
}

export function errorReducer(asyncTaskId, transformActionToData = (payload) => payload) {
  const actionTypes = getAsyncTaskActionTypes(asyncTaskId);

  return (state, action) => {
    const isEndAction = (action.type === actionTypes.end);
    const isLatestQuery = (action.meta === state.query);
    const isError = action.error;
    const shouldUpdateError = (isEndAction && isLatestQuery && isError);

    return shouldUpdateError ? Object.assign({}, state, {
      error: action.payload
    }) : state;
  }
}

export function cacheReducer(asyncTaskId, transformActionToData = (payload) => payload) {
  const actionTypes = getAsyncTaskActionTypes(asyncTaskId);

  return (state, action) => {
    const isEndAction = (action.type === actionTypes.end);
    const isLatestQuery = (action.meta === state.query);
    const isError = action.error;
    const shouldUpdateError = (isEndAction && isLatestQuery && isError);

    return shouldUpdateError ? Object.assign({}, state, {
      cache: {
        ...state.cache,
        [state.query]: transformActionToData(action.payload)
      }
    }) : state;
  }
}

export function queryHistoryReducer(asyncTaskId) {
  const actionTypes = getAsyncTaskActionTypes(asyncTaskId);

  return (state, action) => {
    const isEndAction = (action.type === actionTypes.end);
    const isLatestQuery = (action.meta === state.query);
    const isError = action.error;
    const shouldUpdateError = (isEndAction && isLatestQuery && isError);

    return shouldUpdateError ? Object.assign({}, state, {
      queryHistory: {
        ...state.cache,
        [state.query]: transformActionToData(action.payload)
      }
    }) : state;
  }
}
