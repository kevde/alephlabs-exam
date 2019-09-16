import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
// Material UI
import { Grid, withStyles, Typography } from '@material-ui/core';
// Components
import Task from './Task';
import TaskCountBox from './TaskCountBox';
import TasksGetter from './../core/tasks/getter';
import { STATUS_TEXT } from '../constants';

const styles = (theme) => ({
  droppable: {
    height: '100vh',
  },
  header: {
    backgroundColor: 'rgb(128, 128, 128)',
    color: 'white',
    padding: theme.spacing(3)
  },
});

class TaskContainer extends React.Component {

  getVisibleTasks(tasks) {
    const { taskType } = this.props;
    const filteredTasks = TasksGetter.listByStatus(tasks, taskType);
    return TasksGetter.listSorted(filteredTasks);
  }

  render() {
    const { taskType } = this.props;
    return (
      <Droppable droppableId={`droppable-${taskType}`}>
        {(provided) => this.renderWithDragProvider(provided)}
      </Droppable>
    );
  }

  renderWithDragProvider(provided) {
    const { tasks, taskType, classes } = this.props;
    const sortedTasks = this.getVisibleTasks(tasks);
    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid container className={classes.header}>
            <Grid item xs={8}>
              <Typography variant="h4">{STATUS_TEXT[taskType]}</Typography>
            </Grid>
            <Grid item xs={4}>
              <TaskCountBox tasks={sortedTasks} />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={classes.droppable}>
          {sortedTasks.map((task, index) => <Task task={task} index={index} />)}
        </Grid>
      </Grid>
    );
  }
}

TaskContainer.propTypes = {
  tasks: PropTypes.array,
  taskType: PropTypes.number,
};

export default withStyles(styles)(TaskContainer);