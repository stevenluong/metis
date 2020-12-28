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

import CustomerBookings from './CustomerBookings';
import CustomerPayments from './CustomerPayments';
import CustomerInterests from './CustomerInterests';

import CreateIcon from '@material-ui/icons/Create';

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

export default function Customer() {
  //console.log(asset);
  //console.log(open);
  //console.log(action);
  const selectCustomer = state => state.customer;
  const reduxCustomer = useSelector(selectCustomer);


  //console.log(reduxBookings)
  //const [customer,setCustomer] = React.useState(reduxCustomer);
  const [edit,setEdit] = React.useState(false);

  //if(Object.keys(reduxCustomer).length === 0)
  //  setEdit(true);
  //console.log(edit);
  //if(reduxCustomer.email!=="")
  //  setEdit(true)
  const dispatch = useDispatch()

  const classes = useStyles();
  const handleSubmit = () => {
    //setOpen(false);
    //TODO : Validation
    if(reduxCustomer.email==""){

    }else{
      if(!edit){
        data.addCustomer(reduxCustomer,c => {
          //console.log(c);
          dispatch({type:'customers/customerAdded', payload:{...c,...reduxCustomer}})
          dispatch({type:"customer/customerSet", payload:{...c,...reduxCustomer}})
        })

      }
      else {
        data.editCustomer(reduxCustomer, c=>{
          dispatch({type:'customers/customerEdited', payload:{...c,...reduxCustomer}})
          dispatch({type:"customer/customerSet", payload:{...c,...reduxCustomer}})
        })
      }
      setEdit(false);
    }


    //Handle in REDUX
  };
  //DISABLED
  //const handleRemove = () => {
    //setOpen(false);
  //  data.removeCustomer(customer)
  //};

  //console.log(asset);
  const handleEdit = () => {
    setEdit(true)
  };
  const handleChange = (e,field) => {
    var c = [];
    c.push(field);
    c.push(e.target.value)
    //console.log(c);
    dispatch({type:'customer/customerEdited', payload:c})
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
      <Grid item xs={12} md={12} lg={12}>
      <Paper className={classes.paper}>
      <Title>{reduxCustomer._key?(
        <>Customer</>
      ):(
        <>New Customer</>
      )} {reduxCustomer._key&&!edit?(
        <Button
        variant="outlined"
        color="primary"
        startIcon={<CreateIcon/>}
        onClick = {handleEdit}
        >
        Edit
        </Button>
      ):(<></>)}
      </Title>

      {!reduxCustomer._key||edit?(
        <>
        <div>
        <TextField
            id="firstName"
            label="First Name"
            variant="outlined"
            onChange={(e)=>handleChange(e,'firstName')}
            value={reduxCustomer.firstName||""}
          />

        </div><br/>
        <div>
        <TextField
            id="lastName"
            label="Last Name"
            variant="outlined"
            onChange={(e)=>handleChange(e,'lastName')}
            value={reduxCustomer.lastName||""}
          />
        </div><br/>
        <div>
        <TextField
            id="email"
            label="Email *"
            variant="outlined"
            onChange={(e)=>handleChange(e,'email')}
            value={reduxCustomer.email||""}
          />
        </div><br/>
        <div>
        <TextField
            id="phone"
            label="Phone *"
            variant="outlined"
            onChange={(e)=>handleChange(e,'phone')}
            value={reduxCustomer.phone||""}
          />
        </div><br/>
        <div>
        <TextField
            id="instragram"
            label="Instagram *"
            variant="outlined"
            onChange={(e)=>handleChange(e,'instagram')}
            value={reduxCustomer.instagram||""}
          />
        </div><br/>
        <div>
        <TextField
            id="address"
            label="Address *"
            variant="outlined"
            onChange={(e)=>handleChange(e,'address')}
            value={reduxCustomer.address||""}
          />
        </div><br/>
        <div>
        <Button
        variant="outlined"
        color="primary"
        onClick = {handleSubmit}
        >Done</Button>
        </div>
        </>
      ):(
        <div>
        Name : {reduxCustomer.firstName} {reduxCustomer.lastName} <br/>
        Email : {reduxCustomer.email} <br/>
        Phone : {reduxCustomer.phone} <br/>
        Instagram : {reduxCustomer.instagram} <br/>
        Address : {reduxCustomer.address} <br/>
        </div>
      )}
      </Paper>
      </Grid>

      {reduxCustomer._key&&!edit?(
      <>
      <Grid item xs={12} md={12} lg={12}>
      <Paper className={classes.paper}>
      <CustomerInterests/>
      </Paper>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
      <Paper className={classes.paper}>
      <CustomerBookings/>
      </Paper>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
      <Paper className={classes.paper}>
      <CustomerPayments/>
      </Paper>
      </Grid>
      </>
    ):(
      <>
      </>
    )}
    </Grid>
  );
}
