import React from 'react';
import Title from './Common/Title';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Customer from './Customer';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { useHistory } from 'react-router-dom';
//REDUX
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: theme.spacing(5),
    display: 'flex',
   //overflow: 'auto',
    flexDirection: 'column',
  }
}));

export default function Interests() {
  const classes = useStyles();
  const history = useHistory();
  //REDUX
  const dispatch = useDispatch()
  //const selectNews = state => state.news;
  //const reduxNews = useSelector(selectNews);
  const selectCustomers = state => state.customers;
  const reduxCustomers = useSelector(selectCustomers);
  //console.log(reduxCustomers)
  const selectInterests = state => state.interests;
  const reduxInterests = useSelector(selectInterests);


  /*
  const [open,setOpen] = React.useState(false);
  const [edit,setEdit] = React.useState(true);
  const [customer,setCustomer] = React.useState({});
  const handleEdit = (c) => {
    setOpen(true);
    setEdit(true);
    setCustomer(c);
  };

  //setOpen(editOpen);
  const handleClose = () => {
    setOpen(false);
  };
  */

  const handleNew = () => {
    //setOpen(true);
    //setEdit(false);
    //setCustomer({});
    dispatch({type:"interest/interestSet", payload:{}})
    history.push('/interest');
  };

  const handleEdit = (i) => {
    dispatch({type:"interest/interestSet", payload:i})
    history.push('/customerinterest');
  };
  const handleView = (i) => {
    var customer = reduxCustomers.filter(c=>c._key==i.customer)[0]
    dispatch({type:"customer/customerSet", payload:customer})
    history.push('/customer');
    //dispatch({type:"interest/interestSet", payload:i})
    //history.push('/customerinterest');
  };




  return (
    <Grid container>
      <Grid item xs={12} md={12} lg={12}>
      <Paper className={classes.paper}>
      <Title>Interests <Button
      variant="outlined"
      color="primary"
      startIcon={<AddIcon/>}
      onClick = {()=>handleNew()}
      >
        New
      </Button></Title>
      <div>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Prospect</TableCell>
              <TableCell>New</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reduxInterests.filter(i=>!i.booked).map(i => (
              <TableRow key={i._key}>
              <TableCell>{i.firstName} {i.lastName}</TableCell>
              <TableCell>{reduxCustomers.filter(c=>c.email==i.email).length!=0||i.customer?"No":"Yes"}</TableCell>
              <TableCell>{i.imagePath}</TableCell>
              <TableCell>{i.location}</TableCell>
              <TableCell>{i.size}</TableCell>
              <TableCell>{i.comment}</TableCell>
                <TableCell>
                {i.customer?(
                <Button
                variant="outlined"
                size="small"
                color="primary"
                startIcon={<ViewQuiltIcon/>}
                onClick = {()=>handleView(i)}
                >
                    View
                </Button>
                ):(
                  <></>
                )}
                {!i.customer&&reduxCustomers.filter(c=>c.email==i.email).length==0?(
                  <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  startIcon={<AddIcon/>}
                  //onClick = {()=>handleView(i)}
                  >
                    Create Customer
                  </Button>
                ):(
                  <></>
                )}
                {!i.customer&&reduxCustomers.filter(c=>c.email==i.email).length!=0?(
                  <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  startIcon={<AddIcon/>}
                  //onClick = {()=>handleView(i)}
                  >
                    Link Customer
                  </Button>
                ):(
                  <></>
                )}
                <Button
                variant="outlined"
                size="small"
                color="secondary"
                startIcon={<RemoveIcon/>}
                //onClick = {()=>handleView(i)}
                >
                  Remove
                </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      </Paper>
      </Grid>
    </Grid>
  );
}
