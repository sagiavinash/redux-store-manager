import extend from "just-extend";
import { getAsyncTaskActionTypes } from "./async-task-actions";

export function initialStateReducer({
  query = null,
  data = null,
  isLoading = true
} = {}) {
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

  return (state, action) =>
    action.type === actionTypes.start
      ? extend({}, state, {
          query: action.meta
        })
      : state;
}

export function isLoadingReducer(asyncTaskId) {
  const actionTypes = getAsyncTaskActionTypes(asyncTaskId);

  return (state, action) => {
    switch (action.type) {
      case actionTypes.start: {
        return extend({}, state, {
          isLoading: true
        });
      }
      case actionTypes.success:
      case actionTypes.failure: {
        if (action.meta === state.query) {
          return extend({}, state, {
            isLoading: false
          });
        }
      }
      default:
        return state;
    }
  };
}

export function dataReducer(
  asyncTaskId,
  transformActionToData = payload => payload
) {
  const actionTypes = getAsyncTaskActionTypes(asyncTaskId);

  return (state, action) => {
    const isEndAction = [actionTypes.success, actionTypes.failure].includes(
      action.type
    );
    const isLatestQuery = action.meta === state.query;
    const shouldUpdateData = isEndAction && isLatestQuery;

    return shouldUpdateData
      ? extend({}, state, {
          data: transformData(action.payload, action.meta)
        })
      : state;
  };
}

export function errorReducer(
  asyncTaskId,
  transformActionToData = payload => payload
) {
  const actionTypes = getAsyncTaskActionTypes(asyncTaskId);

  return (state, action) => {
    const isEndAction = [actionTypes.success, actionTypes.failure].includes(
      action.type
    );
    const isLatestQuery = action.meta === state.query;
    const isError = action.error;
    const shouldUpdateError = isEndAction && isLatestQuery && isError;

    return shouldUpdateError
      ? extend({}, state, {
          error: action.payload
        })
      : state;
  };
}

export function cacheReducer(
  asyncTaskId,
  transformActionToData = payload => payload
) {
  const actionTypes = getAsyncTaskActionTypes(asyncTaskId);

  return (state, action) => {
    const isEndAction = [actionTypes.success, actionTypes.failure].includes(
      action.type
    );
    const isLatestQuery = action.meta === state.query;
    const isError = action.error;
    const shouldUpdateError = isEndAction && isLatestQuery && isError;

    return extend({}, state, {
      cache: extend({}, state.cache, {
        [state.query]: transformActionToData(action.payload)
      })
    });
  };
}
