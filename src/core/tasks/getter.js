import _ from 'lodash';
import LocationComparator from '../locations/comparator';
import Task from './task';

class TasksGetter {
  static getTaskByLocation(tasks, location) {
    return _.find(tasks, (task) => task.isLocationMatched(location));
  }

  static getSourceTask(tasks, source) {
    return _.find(tasks, (task) => LocationComparator.isMatched(task, source));
  }

  static listByStatus(tasks, taskStatus) {
    return _.filter(tasks, (task) => task.isStatusMatched(taskStatus));
  }

  static listSorted(tasks) {
    return _.sortBy(tasks, (task) => task.order);
  }

  static listShiftable(tasks, destinationIndex) {
    return _.filter(tasks, (task) => task.order >= destinationIndex);
  }

  static listOtherStatusRelatedTasks(tasks, currentTask) {
    const statusTasks = TasksGetter.listByStatus(tasks, currentTask.status);
    const otherRelatedTasks = _.reject(statusTasks, (task) => task.isLocationMatched(currentTask));
    return otherRelatedTasks;
  }

  static getNewestTaskByStatus(tasks, taskStatus) {
    const statusTasks = TasksGetter.listByStatus(tasks, taskStatus);
    return _.maxBy(statusTasks, (task) => task.id) || new Task(0, '', taskStatus, -1);
  }
}

export default TasksGetter;