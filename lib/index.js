import {createAction} from 'redux-actions';
import reduceReducers from 'reduce-reducers';
import {
  getAsyncTaskActionTypes,
  createAsyncTaskActions
}from './async-task-actions';
import {
  initialStateReducer,
  queryReducer,
  isLoadingReducer,
  dataReducer,
  errorReducer
} from './reducers';

export {getAsyncTaskActionTypes as getAsyncTaskActionTypes};
export {createAsyncTaskActions as createAsyncTaskActions};

export {initialStateReducer as initialStateReducer};
export {queryReducer as queryReducer};
export {isLoadingReducer as isLoadingReducer};
export {dataReducer as dataReducer};
export {errorReducer as errorReducer};

export default function reduxReducer(asyncTaskId, initialState) {
  return reduceReducers(
    initialStateReducer(initialState),
    queryReducer(asyncTaskId),
    isLoadingReducer(asyncTaskId),
    dataReducer(asyncTaskId),
    errorReducer(asyncTaskId)
  );
}
