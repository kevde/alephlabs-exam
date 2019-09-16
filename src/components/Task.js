import React from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import { Card, Typography, withStyles } from '@material-ui/core';

const styles = (theme) => ({
  card: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
});

class Task extends React.Component {

  render() {
    const { task, index } = this.props;
    return (
      <Draggable
        draggableId={`draggable-${task.status}-${index}`}
        index={index}>
        {(provided) => this.renderWithProvided(provided)}
      </Draggable>
    );
  }

  renderWithProvided(provided) {
    const { task, classes } = this.props;
    return (
      <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}>
      <Card className={classes.card}>
        <Typography variant="body1">{task.text}</Typography>
      </Card>
    </div>
    );
  }
}

Task.propTypes = {
  index: PropTypes.number,
  task: PropTypes.object,
}

export default withStyles(styles)(Task);