import _ from 'lodash';
import TasksGetter from './getter';

/**
 * The responsibility of this utility class 
 * is to shift order of tasks when a task is moved
 **/
class TaskOrderShifter {
  static shiftOtherSourceTasks(tasks, destinationIndex) {
    const sortedTasks = TasksGetter.listSorted(tasks);
    const beforeDestinationTasks = _.filter(sortedTasks, (task) => task.order <= destinationIndex);
    const afterDestinationTasks = _.filter(sortedTasks, (task) => task.order > destinationIndex);
    TaskOrderShifter.shiftTasks(beforeDestinationTasks, 0);
    TaskOrderShifter.shiftTasks(afterDestinationTasks, destinationIndex + 1);
  }

  static shiftOtherDestinationTasks(tasks, destinationIndex) {
    const sortedTasks = TasksGetter.listSorted(tasks);
    const beforeDestinationTasks = _.filter(sortedTasks, (task) => task.order < destinationIndex);
    const afterDestinationTasks = _.filter(sortedTasks, (task) => task.order >= destinationIndex);
    TaskOrderShifter.shiftTasks(beforeDestinationTasks, 0);
    TaskOrderShifter.shiftTasks(afterDestinationTasks, destinationIndex + 1);
  }

  static shiftTasks(tasks, startIndex) {
    let index = startIndex;
    for (let task of tasks) {
      task.order = index;
      index++;
    }
    return tasks;
  }
}

export default TaskOrderShifter;