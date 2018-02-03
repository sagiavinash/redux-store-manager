import extend from "just-extend";
import { createAction } from "redux-actions";

export const getAsyncTaskActionTypes = asyncTaskId => ({
  start: `${asyncTaskId}/START`,
  success: `${asyncTaskId}/SUCCESS`,
  failure: `${asyncTaskId}/FAILURE`
});

export const createAsyncTaskActions = (asyncTaskId, metaCalls) => {
  const actionTypes = getAsyncTaskActionTypes(asyncTaskId);

  return {
    start: createAction(
      actionTypes.start,
      () => null, // action.payload
      query => query // action.meta
    ),
    success: createAction(
      actionTypes.success,
      (result, query) => result, // action.payload
      metaCalls.success || ((result, query) => query) // action.meta
    ),
    failure: createAction(
      actionTypes.failure,
      (result, query) => result, // action.payload
      metaCalls.failure || ((result, query) => query) // action.meta
    )
  };
};

export const createAsyncTaskThunk = (
  asyncTaskId,
  createAsyncTask,
  query,
  mapStateToQuery,
  metaCalls
) => (dispatch, getState) => {
  const actions = createAsyncTaskActions(asyncTaskId, metaCalls);

  const taskQuery = extend({}, query, mapStateToQuery(getState()));

  dispatch(actions.start(taskQuery));

  createAsyncTask(
    taskQuery,
    result => actions.success(result, taskQuery),
    error => actions.failure(error, taskQuery)
  );
};

export const createAsyncTaskPromise = (
  asyncTaskId,
  createAsyncTaskPromise,
  query,
  mapStateToQuery,
  metaCalls
) => (dispatch, getState) => {
  const actions = createAsyncTaskActions(asyncTaskId, metaCalls);

  const taskQuery = extend(query, mapStateToQuery(getState()));

  dispatch(actions.start(taskQuery));

  createAsyncTaskPromise(taskQuery).then(
    result => dispatch(actions.success(result, taskQuery)),
    error => dispatch(actions.failure(error, taskQuery))
  );
};
