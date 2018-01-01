import {createAction} from 'redux-actions';

export const getAsyncTaskActionTypes = (asyncTaskId) => ({
  start: `${asyncTaskId}/START`,
  end: `${asyncTaskId}/END`,
});

export const createAsyncTaskActions = (asyncTaskId) => {
  const actionTypes = getAsyncTaskActionTypes(asyncTaskId);

  return {
    start: createAction(
      actionTypes.start,
      () => null,
      (meta) => meta
    ),
    end: createAction(
      actionTypes.end,
      (payload, meta) => payload,
      (payload, meta) => meta
    )
  };
}
