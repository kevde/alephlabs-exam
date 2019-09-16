import _ from 'lodash';
import { STATUS } from '../../constants';
import { ADD_TASK, REORDER_TASK, SWITCH_TASK } from '../constants';
import TasksGetter from '../../core/tasks/getter';
import Task from '../../core/tasks/task';
import TaskOrderShifter from './../../core/tasks/shifter';


export const addTask = (tasks, taskText) => {
  const latestTask = TasksGetter.getNewestTaskByStatus(tasks, STATUS.TO_DO);
  const newestTask = new Task(latestTask.id + 1, taskText, STATUS.TO_DO, latestTask.order + 1);
  tasks.push(newestTask);
  return tasks;
};

export const reorderTasks = (tasks, source, destination) => {
  const sourceTask = TasksGetter.getTaskByLocation(tasks, source);
  const sourceRelatedTasks = TasksGetter.listOtherStatusRelatedTasks(tasks, sourceTask);
  TaskOrderShifter.shiftOtherSourceTasks(sourceRelatedTasks, destination.order);
  sourceTask.setLocation(destination);
  return tasks;
}

export const switchTasks = (tasks, source, destination) => {
  const sourceTask = TasksGetter.getTaskByLocation(tasks, source);
  const sourceRelatedTasks = TasksGetter.listOtherStatusRelatedTasks(tasks, source);
  const destinationStatusTasks = TasksGetter.listByStatus(tasks, destination.status);

  TaskOrderShifter.shiftTasks(sourceRelatedTasks, 0);
  TaskOrderShifter.shiftOtherDestinationTasks(destinationStatusTasks, destination.order);

  sourceTask.setLocation(destination);

  return tasks;
}

export default (state, action) => {
  switch (action.type) {
    case ADD_TASK:
      return { ...state, tasks: addTask(state.tasks, action.taskText) };
    case REORDER_TASK:
      return { ...state, tasks: reorderTasks(state.tasks, action.source, action.destination) };
    case SWITCH_TASK:
      return { ...state, tasks: switchTasks(state.tasks, action.source, action.destination) };
    default:
      return state;
  }
};