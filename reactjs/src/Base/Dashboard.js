import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Search from '../Search';
import DashboardBookings from '../DashboardBookings';
//import Keywords from '../Keywords';
import Day from '../Common/Day';
//import News from '../News';


const useStyles = makeStyles(theme => ({

  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    //display: 'flex',
   //overflow: 'auto',
    flexDirection: 'column',
  }
}));

export default function Dashboard() {
  const classes = useStyles();
  const paper = clsx(classes.paper);

  return (
    <React.Fragment>
    <Grid container direction="row" spacing={3}>
      <Grid item xs={12} md={3} lg={3}>
        <Paper className={paper}>
          <Day/>
        </Paper>
        <br/>
      </Grid>
      <Grid item xs={12} md={9} lg={9}>
        <Paper className={classes.paper}>
          <DashboardBookings/>
        </Paper>
      </Grid>
    </Grid>
    </React.Fragment>
  );
}
