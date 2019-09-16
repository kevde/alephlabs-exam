import React from 'react';
import PropTypes from 'prop-types';
// Material UI
import { withStyles, Grid, TextField } from '@material-ui/core';
import { Form, Field } from 'react-final-form';

const styles = {
  droppable: {
    height: '100vh',
  },
};

class TaskAdder extends React.Component {
  handleSubmit = ({ task }) => {
    const { onAddTask } = this.props;
    onAddTask(task);
  }

  handleAfterSubmit = () => {
    this.formState.form.reset();
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} >
        {(formState) => this.renderForm(formState)}
      </Form>
    );
  }

  renderField() {
    return (
      <Field
          name="task"
          afterSubmit={this.handleAfterSubmit} >
          {({input}) => (
            <TextField
              variant="filled"
              fullWidth
              placeholder="Add task"
              onChange={input.onChange}
              value={input.value}
              InputProps={{
                onEnter: () => this.formState.submit(),
                disableUnderline: true,
              }}
              />
          )}
        </Field>
    );
  }

  renderForm(formState) {
    this.formState = formState;
    return (
      <form onSubmit={formState.handleSubmit}>
        <Grid container direction="row" alignItems="center">
          <Grid item xs={3}>
            <label>Add task</label>
          </Grid>
          <Grid item xs={9}>
            {this.renderField()}
          </Grid>
        </Grid>
      </form>
    )
  }
}

TaskAdder.propTypes = {
  tasks: PropTypes.array,
  taskType: PropTypes.number,
  onAddTask: PropTypes.func,
};

export default withStyles(styles)(TaskAdder);