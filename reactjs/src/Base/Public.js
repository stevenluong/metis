import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useOktaAuth } from '@okta/okta-react';
import { Link as RouterLink, Redirect } from 'react-router-dom';
import logo from '../Common/logo.png';



import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SettingsIcon from '@material-ui/icons/Settings';
import LayersIcon from '@material-ui/icons/Layers';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import FavoriteIcon from '@material-ui/icons/Favorite';

import moment from 'moment';

//REDUX
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

//CONFIG
//import apiConfig from './apiConfig';
import helpers from '../User/helpers';
import data from './data.js';


/*
function createUser(user,cb){
  var q = apiConfig.server+apiConfig.usersDbUrl+"/users/"
  //console.log(q)
  fetch(q,{
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
      .then(result=>result.json())
      .then(u=>{
          //console.log(u);
          cb(Object.assign(user,u));
      });
}
*/

/*
function processNews(news){
  var processedNews = [];
  var seen = {}
  //SEEN
  //processedNews = news.filter((item)=> {return seen.hasOwnProperty(item.title)?false:(seen[item.title]=true)})
  //HTTPS
  //processedNews = news.filter((item)=> {return item.tile.indexOf("https")?false:(seen[item.title]=true)})
  news.forEach(n=>{
    if(n.link.indexOf("https")==-1){
      n.link=n.link.replace("http:","https:");
      //console.log(n.link);
    }
    if(n.image_link && n.image_link.indexOf("https")==-1){
      n.image_link=n.image_link.replace("http:","https:");
      //console.log(n.image_link);
    }
    processedNews.push(n);
  })
  return processedNews;
}
*/


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://steven-luong.com/">
        Steven Luong
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
   //overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  fixedHeight: {
    height: 150,
  },
}));

export default function Template({content}) {
  const { authState, authService } = useOktaAuth();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [userRequested, setUserRequested] = React.useState(false);
  //const [user, setUser] = React.useState({_key:0});
  //const [sources, setSources] = React.useState([]);
  //const [news, setNews] = React.useState([])
  //const [sourcesFiltered, setSourcesFiltered] = React.useState(false)
  //const [keywordsFiltered, setKeywordsFiltered] = React.useState(false)
  //const [keywordsFilteredNews, setKeywordsFilteredNews] = React.useState([])
  //const [sourcesFilteredNews, setSourcesFilteredNews] = React.useState([])
  //const [topics, setTopics] = React.useState([])
  //const [filters, setFilters] = React.useState({
    //TODO - Sources per user
  //  keywords:[],
  //  noKeywords:[]
  //})

  //REDUX
  const dispatch = useDispatch()

  //const [lastVisitSet, setLastVisitSet] = React.useState(false)
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Metis - Bookings
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
        <div>
            <ListItem button component={RouterLink} to="/interest">
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="New Interest" />
            </ListItem>
        </div>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {content}
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
