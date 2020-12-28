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

export default function CustomerPayment() {
  const history = useHistory();

  const selectPayment = state => state.payment;
  const reduxPayment = useSelector(selectPayment);

  //const selectUser = state => state.user;
  //const reduxUser = useSelector(selectUser);

  const selectCustomer = state => state.customer;
  const reduxCustomer = useSelector(selectCustomer);

  if(!reduxCustomer._key)
    history.push("/customers");
  const dispatch = useDispatch()

  const classes = useStyles();
  const handleSubmit = () => {

    if(reduxPayment.amount==""){
      //TODO - VALIDATION
    }else{
      if(!reduxPayment._key){
        data.addPayment(reduxPayment,o => {
          dispatch({type:'payments/paymentAdded', payload:{...o,...reduxPayment}})
        })
      }
      else {
        data.editPayment(reduxPayment, o=>{
          dispatch({type:'payments/paymentEdited', payload:{...o,...reduxPayment}})
        })
      }
      history.push("/customer");
    }


    //Handle in REDUX
  };

  const handleChange = (e,field) => {
    //console.log(e.target)
    var o = [];
    o.push(field);
    o.push(e.target.value)
    //console.log(c);
    dispatch({type:'payment/paymentEdited', payload:o})
  };
  //const handleToggle = (field) => {
    //console.log(e.target)
  //  var o = [];
  //  o.push(field);
  //  o.push(!reduxPayment[field])
    //console.log(c);
  //  dispatch({type:'payment/paymentEdited', payload:o})
  //};
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
      <Title>{reduxPayment._key?(
        <>Payment</>
      ):(
        <>New Payment</>
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
            value={reduxPayment.datetime}
          />
        </div><br/>
        <div>
        <TextField
            label="Duration"
            type="number"
            variant="outlined"
            onChange={(e)=>handleChange(e,'duration')}
            value={reduxPayment.duration}
          />
        </div><br/>
        <div>
        <TextField
            label="Rate"
            type="number"
            variant="outlined"
            onChange={(e)=>handleChange(e,'rate')}
            value={reduxPayment.rate}
          />
        </div><br/>
        <div>
        <TextField
            label="Type"
            variant="outlined"
            onChange={(e)=>handleChange(e,'type')}
            value={reduxPayment.type}
          />
        </div><br/>
        <div>
        <TextField
            label="Amount"
            variant="outlined"
            onChange={(e)=>handleChange(e,'amount')}
            value={reduxPayment.amount}
          />
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
