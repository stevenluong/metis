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

import moment from 'moment';

//REDUX
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';

import { useHistory } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(5),
    display: 'flex',
   //overflow: 'auto',
    flexDirection: 'column',
  }
}));

export default function Bookings() {
  const classes = useStyles();
  const history = useHistory();
  //var keywords = {}
  //var userSources = user.sources;
  //if(sources)
  //REDUX
  const dispatch = useDispatch()
  //const selectNews = state => state.news;
  //const reduxNews = useSelector(selectNews);
  const selectCustomers = state => state.customers;
  const reduxCustomers = useSelector(selectCustomers);
  const selectBookings = state => state.bookings;
  const reduxBookings = useSelector(selectBookings);
  var today = moment();
  const [day,setDay] = React.useState(today);

  const handleView = (c) => {
    //var c = reduxCustomers.filter(c=>c._key==b.customer)[0]
    dispatch({type:"customer/customerSet", payload:c})
    history.push('/customer');
  };
  const days = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"];
  var week = {};
  days.forEach(d=>{
    week[d]=[]
  })
  console.log(day)
  const weekStart = moment(day).startOf("week").add(1,"day")
  var weekEnd = moment(day).endOf("week").add(1,"day")
  //console.log(week);

  //console.log(keywords);
  //var sortedSources = reduxSources.slice().sort((a,b)=>a.name.localeCompare(b.name));
  //moment().format('dddd') => Friday

  reduxBookings.filter(b=>moment(b.datetime)>=weekStart&&moment(b.datetime)<=weekEnd).map(b=> {
    days.map(d=>{
      //console.log(d)
      //console.log(moment(b.datetime).format('dddd').toLowerCase());
      if(moment(b.datetime).format('dddd').toLowerCase()==d){
        week[d].push(b);
      }
    })
  })

  const handleDateChange = (e) => {
    //console.log(e.target)
    //console.log(c);
    //console.log(e.target.value)
    setDay(moment(e.target.value));
    //dispatch({type:'booking/bookingEdited', payload:c})
  };

  //var today = moment();
  return (
    <Grid container>
      <Grid item xs={12} md={12} lg={12}>
      <Paper className={classes.paper}>
      <Title>Calendar</Title>
      <div>
      <TextField
          label="Day"
          type="date"
          variant="outlined"
          //defaultValue={reduxBooking.datetime}
          onChange={(e)=>handleDateChange(e)}
          value={day.format("YYYY-MM-DD")}
        />
      </div>
      Week : {weekStart.format("YYYY-MM-DD")} to {weekEnd.format("YYYY-MM-DD")}
      <div>
        <Table size="small">
          <TableHead>
            <TableRow>
            {days.map((d,i)=>{
              return (
                <TableCell>{d}-{moment(weekStart).add(i,"day").format("DD/MM")}</TableCell>
              )
            })
            }
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow>
                {days.map(d=>{
                  return (
                    <>
                    <TableCell>
                    <List>
                      {week[d].map(b=>{
                      var c = reduxCustomers.filter(c=>c._key==b.customer)[0];
                      //console.log(b);
                      return (
                        <>
                        <ListItem button onClick = {()=>handleView(c)}>
                        {moment(b.datetime).format("HH:mm")} - {b.duration}H - {c?c.firstName:""} {c?c.lastName:""}
                        </ListItem>
                        </>
                      )
                    })}
                    </List>
                    </TableCell>
                    </>
                    )
                })
                }
              </TableRow>

          </TableBody>
        </Table>
      </div>

      </Paper>
      </Grid>
    </Grid>
  );
}
