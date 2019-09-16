# AlephLabs React Application

This application is an example of using React with Redux

All redux actions related to the project are prefixed with *ALEPHLABS_*



## Redux Actions

```
ALEPHLABS_ADD_TASK
```

Action that adds a tasks to the to-do status

```
ALEPHLABS_REORDER_TASK
```

Action that reorders a task to a certain order (but not moving to another status)

```
ALEPHLABS_SWITCH_TASK
```

Action moves a task to a different status and reorder the departing status list and its arrival status list



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
