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
import Hidden from '@material-ui/core/Hidden';

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

export default function Customers() {
  const classes = useStyles();
  const history = useHistory();
  //REDUX
  const dispatch = useDispatch()
  //const selectNews = state => state.news;
  //const reduxNews = useSelector(selectNews);
  const selectCustomers = state => state.customers;
  const reduxCustomers = useSelector(selectCustomers);
  //console.log(reduxCustomers)



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
    dispatch({type:"customer/customerSet", payload:{}})
    history.push('/customer');
  };

  const handleView = (c) => {
    dispatch({type:"customer/customerSet", payload:c})
    history.push('/customer');
  };




  return (
    <Grid container>
      <Grid item xs={12} md={12} lg={12}>
      <Paper className={classes.paper}>
      <Title>Customers <Button
      variant="outlined"
      color="primary"
      startIcon={<AddIcon/>}
      onClick = {handleNew}
    >
      New
    </Button></Title>
      <div>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Instagram</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <Hidden xlDown>
                <TableCell style={{ minWidth: 200 }}>Address</TableCell>
              </Hidden>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reduxCustomers.map(c => (
              <TableRow key={c._key}>
                <TableCell>{c.firstName} {c.lastName}</TableCell>
                <TableCell>{c.instagram}</TableCell>
                <TableCell>{c.email}</TableCell>
                <TableCell>{c.phone}</TableCell>
                <Hidden xlDown>
                  <TableCell>{c.address}</TableCell>
                </Hidden>
                <TableCell>
                <Button
                variant="outlined"
                size="small"
                color="primary"
                startIcon={<ViewQuiltIcon/>}
                onClick = {()=>handleView(c)}
              >
                View
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
