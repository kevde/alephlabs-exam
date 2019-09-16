import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Card, Grid, Box } from '@material-ui/core';

const styles = {};

class TaskCountBox extends React.Component {
  render() {
    const { tasks } = this.props;
    return (
      <Card>
        <Grid
          container
          justify="center"
          alignItems="center"
          direction="column">
          <Grid item>
            <Box fontWeight="fontWeightBold">{tasks.length}</Box>
          </Grid>
          <Grid item>Tasks</Grid>
        </Grid>
      </Card>
    );
  }
}

TaskCountBox.propTypes = {
  tasks: PropTypes.array,
};

export default withStyles(styles)(TaskCountBox);