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

import Tooltip from '@material-ui/core/Tooltip';
import CreateIcon from '@material-ui/icons/Create';
import CreditCardIcon from '@material-ui/icons/CreditCard';

import { useHistory } from 'react-router-dom';

export default function CustomerBookings() {

  const history = useHistory();
  //REDUX
  const dispatch = useDispatch()
  const selectCustomer = state => state.customer;
  const reduxCustomer = useSelector(selectCustomer);
  const selectBookings = state => state.bookings.filter(b=>{
    return b.customer==reduxCustomer._key
  });
  const reduxBookings = useSelector(selectBookings);
  //const selectFilters = state => state.filters;
  //const reduxFilters = useSelector(selectFilters);


  //console.log(rawKeywords)
  //rawTopics.sort(function(a, b){return b.count - a.count});
  //rawKeywords = rawKeywords.slice(0,20);

  const handleNew = () => {
    dispatch({type:"booking/bookingSet", payload:{
      customer:reduxCustomer._key,
      datetime:moment().format("YYYY-MM-DDT10:00"),
      duration:1,
      rate:190,
      city:"Brisbane",
      depositSent:false,
      depositReceived:false,
      welcomePackSent:false,
      covidFormSent:false,
      covidFormReceived:false,
    }})
    history.push('/customerbooking');
  };

  const handleEdit = (b) => {
    dispatch({type:"booking/bookingSet", payload:b})
    history.push('/customerbooking');
  };
  const handlePay = (b) => {
    dispatch({type:"payment/paymentSet", payload:{
      customer:reduxCustomer._key,
      booking:b._key,
      datetime:moment().format("YYYY-MM-DDTHH:mm"),
      duration:b.duration,
      rate:b.rate,
      type:"Card",
      amount:parseInt(b.rate)*parseInt(b.duration)
    }})
    history.push('/customerpayment');
  };

  //console.log(keywords);
  return (
    <React.Fragment>
      <Title>Bookings <Button
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
            <TableCell>Duration & Rate</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Process</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reduxBookings.map(b => (
            <TableRow key={b._key}>
              <TableCell>{moment(b.datetime).format("YYYY-MM-DD")} <br/> {moment(b.datetime).format("HH:mm")}</TableCell>
              <TableCell>{b.duration}H <br/> {b.rate}$/H</TableCell>
              <TableCell>{b.city}</TableCell>
              <TableCell>
              <HtmlTooltip
                title={
                  <React.Fragment>
                    {b.depositSent?(<></>):(<>!Deposit to be sent<br/></>)}
                    {b.depositReceived?(<></>):(<>!Deposit to be received<br/></>)}
                    {b.welcomePackSent?(<></>):(<>!Welcome Pack to be sent<br/></>)}
                    {b.covidFormSent?(<></>):(<>!Covid Form to be sent<br/></>)}
                    {b.covidFormReceived?(<></>):(<>!Covid Form to be received<br/></>)}
                  </React.Fragment>
                }
              >
                <Button color={b.depositSent&&b.depositReceived&&b.welcomePackSent&&b.covidFormSent&&b.covidFormReceived?"primary":"secondary"}>{b.depositSent&&b.depositReceived&&b.welcomePackSent&&b.covidFormSent&&b.covidFormReceived?"DONE":"TODO"}</Button>
              </HtmlTooltip>

              </TableCell>
              <TableCell>
              <Button
              variant="outlined"
              size="small"
              color="primary"
              startIcon={<CreateIcon/>}
              onClick = {()=>handleEdit(b)}
              >
                Edit
              </Button>
              <Button
              variant="outlined"
              size="small"
              color="primary"
              startIcon={<CreditCardIcon/>}
              onClick = {()=>handlePay(b)}
              >
                Pay
              </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);
