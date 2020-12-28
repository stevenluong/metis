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


export default function DashboardBookings() {


  //REDUX
  const dispatch = useDispatch()
  const selectBookings = state => state.bookings;
  const reduxBookings = useSelector(selectBookings);
  const selectUser = state => state.user;
  const reduxUser = useSelector(selectUser);
  //const selectFilters = state => state.filters;
  //const reduxFilters = useSelector(selectFilters);


  //console.log(rawKeywords)
  //rawTopics.sort(function(a, b){return b.count - a.count});
  //rawKeywords = rawKeywords.slice(0,20);

  //console.log(keywords);
  return (
    <React.Fragment>
      <Title>Next Bookings</Title>
      <div>
      {reduxBookings.map((k,i) => (
        <React.Fragment key={k.word}>
        
        </React.Fragment>
      ))}
      </div>
    </React.Fragment>
  )
}
