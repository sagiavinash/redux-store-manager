import { createAction } from "redux-actions";
import reduceReducers from "reduce-reducers";
import {
  initialStateReducer,
  queryReducer,
  isLoadingReducer,
  dataReducer,
  errorReducer
} from "./reducers";

export {
  getAsyncTaskActionTypes,
  createAsyncTaskActions,
  createAsyncTaskThunk,
  createAsyncTaskPromise
} from "./async-task-actions";

export {
  initialStateReducer,
  queryReducer,
  isLoadingReducer,
  dataReducer,
  errorReducer,
  cacheReducer
} from "./reducers";

export default function reduxReducer(asyncTaskId, initialState) {
  return reduceReducers(
    initialStateReducer(initialState),
    queryReducer(asyncTaskId),
    isLoadingReducer(asyncTaskId),
    dataReducer(asyncTaskId),
    errorReducer(asyncTaskId),
    cacheReducer(asyncTaskId)
  );
}
