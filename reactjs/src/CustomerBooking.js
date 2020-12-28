import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Title from './Common/Title';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import { makeStyles } from '@material-ui/core/styles';

import data from './Base/data.js';


//REDUX
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import moment from 'moment';

import CreateIcon from '@material-ui/icons/Create';
import { useHistory } from 'react-router-dom';

import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3),
    display: 'flex',
   //overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function CustomerBooking() {
  const history = useHistory();

  const selectBooking = state => state.booking;
  const reduxBooking = useSelector(selectBooking);

  //const selectUser = state => state.user;
  //const reduxUser = useSelector(selectUser);

  const selectCustomer = state => state.customer;
  const reduxCustomer = useSelector(selectCustomer);

  if(!reduxCustomer._key)
    history.push("/customers");
  const dispatch = useDispatch()

  const classes = useStyles();
  const handleSubmit = () => {

    if(reduxBooking.city==""){
      //TODO - VALIDATION
    }else{
      if(!reduxBooking._key){
        data.addBooking(reduxBooking,b => {
          dispatch({type:'bookings/bookingAdded', payload:{...b,...reduxBooking}})
        })
      }
      else {
        data.editBooking(reduxBooking, b=>{
          dispatch({type:'bookings/bookingEdited', payload:{...b,...reduxBooking}})
        })
      }
      history.push("/customer");
    }


    //Handle in REDUX
  };

  const handleChange = (e,field) => {
    //console.log(e.target)
    var c = [];
    c.push(field);
    c.push(e.target.value)
    //console.log(c);
    dispatch({type:'booking/bookingEdited', payload:c})
  };
  const handleToggle = (field) => {
    //console.log(e.target)
    var c = [];
    c.push(field);
    c.push(!reduxBooking[field])
    //console.log(c);
    dispatch({type:'booking/bookingEdited', payload:c})
  };
  //const handleEmailChange = (e) => {
  //  dispatch({type:'customer/customerEdited', payload:{...customer, email:e.target.value}})
  //};

  //console.log(reduxCustomer)
  //if(reduxCustomer._key)
  //  setEdit(false)
  //console.log(sortedAssets)
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8} lg={8}>
      <Paper className={classes.paper}>
      <Title>{reduxBooking._key?(
        <>Booking</>
      ):(
        <>New Booking</>
      )}</Title>
      </Paper>
      </Grid>
      <Grid item xs={12} md={8} lg={8}>
      <Paper className={classes.paper}>
        <div>
        <TextField
            label="Date & Time"
            type="datetime-local"
            variant="outlined"
            //defaultValue={reduxBooking.datetime}
            onChange={(e)=>handleChange(e,'datetime')}
            value={reduxBooking.datetime}
          />

        </div><br/>
        <div>
        <TextField
            id="duration"
            label="Duration"
            type="number"
            variant="outlined"
            onChange={(e)=>handleChange(e,'duration')}
            value={reduxBooking.duration}
          />
        </div><br/>
        <div>
        <TextField
            label="Rate"
            type="number"
            variant="outlined"
            onChange={(e)=>handleChange(e,'rate')}
            value={reduxBooking.rate}
          />
        </div><br/>
        <div>
        <TextField
            label="City"
            variant="outlined"
            onChange={(e)=>handleChange(e,'city')}
            value={reduxBooking.city}
          />
        </div><br/>
        <div>
          <Checkbox
            color="primary"
            checked={reduxBooking.depositSent}
            onChange={()=>handleToggle('depositSent')}
          /> Deposit Sent
        </div><br/>
        <div>
          <Checkbox
            color="primary"
            checked={reduxBooking.depositReceived}
            onChange={()=>handleToggle('depositReceived')}
          /> Deposit Received
        </div><br/>
        <div>
          <Checkbox
            color="primary"
            checked={reduxBooking.welcomePackSent}
            onChange={()=>handleToggle('welcomePackSent')}
          /> Welcome Pack Sent
        </div><br/>
        <div>
          <Checkbox
            color="primary"
            checked={reduxBooking.covidFormSent}
            onChange={()=>handleToggle('covidFormSent')}
          /> Covid Form Sent
        </div><br/>
        <div>
          <Checkbox
            color="primary"
            checked={reduxBooking.covidFormReceived}
            onChange={()=>handleToggle('covidFormReceived')}
          /> Covid Form Received
        </div><br/>
        <div>
        <Button
        variant="outlined"
        color="primary"
        onClick = {handleSubmit}
        >Done</Button>
        </div>
      </Paper>
      </Grid>
    </Grid>
  );
}
