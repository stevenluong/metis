import React from 'react';
import Title from './Common/Title';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import RemoveIcon from '@material-ui/icons/Remove';
import BackspaceIcon from '@material-ui/icons/Backspace';
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined';
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';

//REDUX
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'

import moment from 'moment';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import CreateIcon from '@material-ui/icons/Create';

import { useHistory } from 'react-router-dom';

export default function CustomerPayments() {

  const history = useHistory();
  //REDUX
  const dispatch = useDispatch()
  const selectCustomer = state => state.customer;
  const reduxCustomer = useSelector(selectCustomer);
  const selectPayments = state => state.payments.filter(p=>{
    return p.customer==reduxCustomer._key
  });
  const reduxPayments = useSelector(selectPayments);
  //const selectFilters = state => state.filters;
  //const reduxFilters = useSelector(selectFilters);


  //console.log(rawKeywords)
  //rawTopics.sort(function(a, b){return b.count - a.count});
  //rawKeywords = rawKeywords.slice(0,20);
  const handleNew = () => {
    dispatch({type:"payment/paymentSet", payload:{
      customer:reduxCustomer._key,
      datetime:moment().format("YYYY-MM-DDTHH:mm"),
      duration:2,
      rate:190,
      type:"Card",
      amount:380
    }})
    history.push('/customerpayment');
  };

  const handleEdit = (p) => {
    dispatch({type:"payment/paymentSet", payload:p})
    history.push('/customerpayment');
  };
  //console.log(keywords);
  return (
    <React.Fragment>
      <Title>Payments <Button
      variant="outlined"
      color="primary"
      startIcon={<AddIcon/>}
      onClick = {()=>handleNew()}
      >
      New
      </Button></Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date & Time</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reduxPayments.map(p => (
            <TableRow key={p._key}>
              <TableCell>{moment(p.datetime).format("YYYY-MM-DD")} <br/> {moment(p.datetime).format("HH:mm")}</TableCell>
              <TableCell>{p.amount}</TableCell>
              <TableCell>{p.type}</TableCell>
              <TableCell>
              <Button
              variant="outlined"
              size="small"
              color="primary"
              startIcon={<CreateIcon/>}
              onClick = {()=>handleEdit(p)}
            >
              Edit
            </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
