import _ from 'lodash';
import { ADD_TASK, DROP_TASK, REORDER_TASK, SWITCH_TASK } from './constants';

export const createDispatchers = (dispatch) => {
  return {
    addTask: (taskText) => dispatch({
      type: ADD_TASK,
      taskText,
    }),
    dragTask: (source, destination) => dispatch({
      type: DROP_TASK,
      source,
      destination,
    }),
    reorderTasks: (source, destination) => dispatch({
      type: REORDER_TASK,
      source,
      destination,
    }),
    switchTasks: (source, destination) => dispatch({
      type: SWITCH_TASK,
      source,
      destination,
    }),
  };
};