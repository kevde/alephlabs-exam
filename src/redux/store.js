import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import _ from 'lodash';
// Components
import taskReducer from './reducers/taskReducer';
import { cards } from '../tasks.json';
import Task from '../core/tasks/task';

const convertedTasks = _.map(cards, (card) => Task.parse(card));

function configureStore(state = { tasks: convertedTasks }) {
  return createStore(taskReducer, state, composeWithDevTools());
}

export default configureStore;