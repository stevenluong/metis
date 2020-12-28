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
import { useHistory } from 'react-router-dom';

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

export default function Interest() {
  const history = useHistory();
  const selectInterest = state => state.interest;
  const reduxInterest = useSelector(selectInterest);

  const selectUser = state => state.user;
  const reduxUser = useSelector(selectUser);

  const dispatch = useDispatch()

  const classes = useStyles();
  const handleSubmit = () => {
    if(reduxInterest.email==""){
      //TODO - VALIDATION
    }else{
      if(reduxUser._key){
        if(!reduxInterest._key){
          data.addInterest(reduxInterest,i => {
            //console.log(c);
            dispatch({type:'interests/interestAdded', payload:{...i,...reduxInterest}})
            //dispatch({type:"customer/customerSet", payload:{...c,...reduxCustomer}})
          })
        }
        else {
          data.editInterest(reduxInterest, i=>{
            dispatch({type:'interests/interestEdited', payload:{...i,...reduxInterest}})
            //dispatch({type:"customer/customerSet", payload:{...c,...reduxCustomer}})
          })
        }
        history.push('/interests');
      }else{
        data.addInterest(reduxInterest,i => {
          history.push('/thanks');
        })
      }
    }


    //Handle in REDUX
  };

  const handleChange = (e,field) => {
    var c = [];
    c.push(field);
    c.push(e.target.value)
    //console.log(c);
    dispatch({type:'interest/interestEdited', payload:c})

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
      <Title>{reduxInterest._key?(
        <>Interest</>
      ):(
        <>New Interest</>
      )}</Title>
      </Paper>
      </Grid>
      <Grid item xs={12} md={8} lg={8}>
      <Paper className={classes.paper}>
      <h2>Personal Details</h2>
        <div>
        <TextField
            id="firstName"
            label="First Name"
            variant="outlined"
            onChange={(e)=>handleChange(e,'firstName')}
            value={reduxInterest.firstName||""}
          />

        </div><br/>
        <div>
        <TextField
            id="lastName"
            label="Last Name"
            variant="outlined"
            onChange={(e)=>handleChange(e,'lastName')}
            value={reduxInterest.lastName||""}
          />
        </div><br/>
        <div>
        <TextField
            id="email"
            label="Email *"
            variant="outlined"
            onChange={(e)=>handleChange(e,'email')}
            value={reduxInterest.email||""}
          />
        </div><br/>
        <div>
        <TextField
            id="phone"
            label="Phone *"
            variant="outlined"
            onChange={(e)=>handleChange(e,'phone')}
            value={reduxInterest.phone||""}
          />
        </div><br/>
        <div>
        <TextField
            id="instragram"
            label="Instagram *"
            variant="outlined"
            onChange={(e)=>handleChange(e,'instagram')}
            value={reduxInterest.instagram||""}
          />
        </div><br/>
        <div>
        <TextField
            id="address"
            label="Address"
            variant="outlined"
            onChange={(e)=>handleChange(e,'address')}
            value={reduxInterest.address||""}
          />
        </div>
      </Paper>
      </Grid>
      <Grid item xs={12} md={8} lg={8}>
      <Paper className={classes.paper}>
        <h2>Tattoo Details</h2>
        <div>
        <TextField
            id="image"
            label="Image"
            variant="outlined"
            onChange={(e)=>handleChange(e,'image')}
            value={reduxInterest.image||""}
          />

        </div><br/>
        <div>
        <TextField
            id="location"
            label="Location (on Body)"
            variant="outlined"
            onChange={(e)=>handleChange(e,'location')}
            value={reduxInterest.location||""}
          />
        </div><br/>
        <div>
        <TextField
            id="size"
            label="Size (in cm)"
            variant="outlined"
            onChange={(e)=>handleChange(e,'size')}
            value={reduxInterest.size||""}
          />
        </div><br/>
        <div>
        <TextField
            id="comment"
            label="Comment"
            variant="outlined"
            multiline
            rows={4}
            onChange={(e)=>handleChange(e,'comment')}
            value={reduxInterest.comment||""}
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
