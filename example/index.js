// import reduxReducer, {createAsyncTaskActions} = 'redux-standard-reducers';

const reduxReducer = require('../dist/redux-standard-reducers').default;
const createAsyncTaskActions = require('../dist/redux-standard-reducers').createAsyncTaskActions;

const getInfoTaskId = 'GET_INFO';

const getInfoActions = createAsyncTaskActions(getInfoTaskId);
const infoReducer = reduxReducer(getInfoTaskId);

const startAction = getInfoActions.start({id: 1});
const successAction = getInfoActions.end({id: 1, title: 'hello'});
const failureAction = getInfoActions.end(new Error('Internal Server Error'));

const initialState = infoReducer(undefined, {});
const startAfterState = infoReducer(initialState, startAction);
const startAfterSuccess = infoReducer(initialState, successAction);
const startAfterFailure = infoReducer(initialState, failureAction);

console.log('startAction', startAction);
console.log('successAction', successAction);
console.log('failureAction', failureAction);

console.log('initialState', initialState);
console.log('startAfterState', startAfterState);
console.log('startAfterSuccess', startAfterSuccess);
console.log('startAfterFailure', startAfterFailure);
