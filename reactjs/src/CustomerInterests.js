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
import BookmarkIcon from '@material-ui/icons/Bookmark';

export default function CustomerInterests() {

  const history = useHistory();
  //REDUX
  const dispatch = useDispatch()
  const selectCustomer = state => state.customer;
  const reduxCustomer = useSelector(selectCustomer);
  const selectInterests = state => state.interests.filter(p=>{
    return p.customer==reduxCustomer._key
  });
  const reduxInterests = useSelector(selectInterests);

  const handleNew = () => {
    dispatch({type:"interest/interestSet", payload:{
      customer:reduxCustomer._key,
      firstName:reduxCustomer.firstName,
      lastName:reduxCustomer.lastName
    }})
    history.push('/customerinterest');
  };
  const handleEdit = (i) => {
    dispatch({type:"interest/interestSet", payload:i})
    history.push('/customerinterest');
  };

  return (
    <React.Fragment>
      <Title>Interests <Button
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
            <TableCell>Image</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Comment</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reduxInterests.map(i => (
            <TableRow key={i._key}>
              <TableCell>{i.imagePath}</TableCell>
              <TableCell>{i.location}</TableCell>
              <TableCell>{i.size}</TableCell>
              <TableCell>{i.comment}</TableCell>
              <TableCell>
              <Button
              variant="outlined"
              size="small"
              color="primary"
              startIcon={<CreateIcon/>}
              onClick = {()=>handleEdit(i)}
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
