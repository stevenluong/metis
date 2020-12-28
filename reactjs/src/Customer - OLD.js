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


import { makeStyles } from '@material-ui/core/styles';

import data from './Base/data.js';
//REDUX
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    display: 'flex',
   //overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function Customer() {
  //console.log(asset);
  //console.log(open);
  //console.log(action);
  const selectCustomer = state => state.customers.customer;
  const reduxCustomer = useSelector(selectCustomer);

  const dispatch = useDispatch()

  const classes = useStyles();
  const handleAdd = () => {
    setOpen(false);
    if(!edit){
      data.addCustomer(customer,c => {
        //console.log(c);
        dispatch({type:'customers/customerAdded', payload:{...c,...customer}})
      })

    }
    else {
      data.editCustomer(customer, c=>{
        dispatch({type:'customers/customerEdited', payload:{...c,...customer}})
      })
    }
    //Handle in REDUX
  };
  //DISABLED
  const handleRemove = () => {
    setOpen(false);
    data.removeCustomer(customer)
  };

  //console.log(asset);
  const handleFirstNameChange = (e) => {
    setCustomer({...customer, firstName:e.target.value});
  };
  const handleEmailChange = (e) => {
    setCustomer({...customer, email:e.target.value});
  };


  //console.log(sortedAssets)
  return (
    <Grid container>
      <Grid item xs={12} md={12} lg={12}>
      <Paper className={classes.paper}>
      <Title>Customer - {reduxCustomer.email}</Title>
      </Paper>
      </Grid>
    </Grid>
    <React.Fragment>

          <div className={classes.paper}>
            <Title>{edit?"Edit":"New Customer"}</Title>
            <br/>
            <TextField
                id="firstName"
                label="First Name"
                variant="outlined"
                onChange={handleFirstNameChange}
                value={customer.firstName}
              />
            <br/>
            <TextField
                id="email"
                label="Email *"
                variant="outlined"
                onChange={handleEmailChange}
                value={customer.email}
              />
            <br/>
              <Button
              variant="contained"
              color="primary"
              onClick = {handleAdd}
            >
              {edit? "Edit" : "Add"}

          </Button>

          {false && (
          <React.Fragment>
            <br/>
            <Button
          variant="contained"
          color="secondary"
          onClick = {handleRemove}
          >
            Remove
          </Button>
          </React.Fragment>
        )}

          </div>

    </React.Fragment>
  );
}
