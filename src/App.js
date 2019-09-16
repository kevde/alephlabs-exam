import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
// Material UI
import { Grid, MuiThemeProvider, withStyles } from '@material-ui/core';
// Components
import TaskCountBox from './components/TaskCountBox';
import TaskContainer from './components/TaskContainer';
import TaskAdder from './components/TaskAdder';
import defaultTheme from './themes/default';
import { createDispatchers } from './redux/actions';
import { STATUS } from './constants';
import Location from './core/tasks/location';
import LocationComparator from './core/locations/comparator';
import TasksGetter from './core/tasks/getter';

const styles = {
  root: {
    backgroundColor: 'rgb(211, 211, 211)',
    padding: '1em',
    width: '100vw',
  },
};

const mapStateToProps = state => ({ ...state });
const mapDispatchToProps = dispatch => createDispatchers(dispatch);
const reduxOptions = {
  areStatePropsEqual: (prev, next) => {
    return prev === next;
  }
}

class App extends React.Component {

  handleDragEnd = ({ source: sourceDroppable, destination: destinationDroppable }) => {
    const { tasks, reorderTasks, switchTasks } = this.props;

    // skip if either droppable source or destination is undefined
    if (!sourceDroppable || !destinationDroppable) {
      return;
    }
    // preset objects to compare
    const source = new Location(sourceDroppable);
    const destination = new Location(destinationDroppable);
    const destinationTask = TasksGetter.getTaskByLocation(tasks, destination);
    
    // skip if either droppable source or destination are both on the same location
    if (LocationComparator.isMatched(source, destination)) {
      return;
    }
    
    // if both source and destination are similar (reorder only)
    // if not, perform switch tasks from one status to another
    if (LocationComparator.areStatusSimilar(destinationTask, source, destination)) {
      reorderTasks(source, destination);
    } else {
      switchTasks(source, destination);
    }
  };


  renderTaskPanels(tasks) {
    return (
      <DragDropContext onDragEnd={this.handleDragEnd}>
        <Grid container spacing={5}>
          <Grid item xs={4}>
            <TaskContainer tasks={tasks} taskType={STATUS.TO_DO} />        
          </Grid>
          <Grid item xs={4}>
            <TaskContainer tasks={tasks} taskType={STATUS.IN_PROGRESS} />
          </Grid>
          <Grid item xs={4}>
            <TaskContainer tasks={tasks} taskType={STATUS.DONE} />
          </Grid>
        </Grid>
      </DragDropContext>
    );
  }

  render() {
    const { classes, addTask, tasks } = this.props;
    return (
      <MuiThemeProvider theme={defaultTheme}>
        <Grid className={classes.root} container spacing={5}>
          <Grid item xs={4}><TaskAdder onAddTask={addTask}/></Grid>
          <Grid item xs={6} />
          <Grid item xs={2}><TaskCountBox tasks={tasks} /></Grid>
          <Grid item xs={12}>{this.renderTaskPanels(tasks)}</Grid>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, reduxOptions)(withStyles(styles)(App));
