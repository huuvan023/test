import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/lab/Skeleton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import ClearIcon from '@material-ui/icons/Clear';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { store } from './../store/store';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import Axios from 'axios';
import Divider from '@material-ui/core/Divider';
import AccordionActions from '@material-ui/core/AccordionActions';
import { Link, useHistory } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import { Typography } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    fontFamily:"Antic"
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
  sectionDesktop: {
    display: 'none',
    alignItems:"center",
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  avatarLarge: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: theme.spacing(0)
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    fontWeight: "bold"
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    display: "flex",
    alignItems: "center"
  },
  chipMessageIcon: {
    fontSize: '12px',
    fontWeight: "bold",
    cursor: 'pointer',
    backgroundColor: 'red',
    color: 'white'
  },
  receiveMessage: {
    fontSize: '12px',
    fontWeight: "bold",
    cursor: 'pointer',
    backgroundColor: 'green',
    color: 'white'
  },
  dialogActionWrap: {
    margin: theme.spacing(1)
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function NavBar() {
  const classes = useStyles();
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [mobileHandleLOgout,setmobileHandleLOgout] = useState(false)
  const [openLogout, setOpen] = React.useState(false)
  const [openNotification, setopenNotification] = useState(false)
  const [openMobileNotification, setopenMobileNotification] = useState(false)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const globalState = React.useContext(store)
  const { dispatch } = globalState;
  
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onLogout = () => {
    delete Axios.defaults.headers.common['Authorization']
    dispatch({ type: "LOG_OUT"})
  }
  const handleGoToUser = () => {
    history.push("/user");
  }
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => setopenMobileNotification(true)}
      >
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <Dialog TransitionComponent={Transition} fullWidth
            open={openMobileNotification} onClose={() => setopenMobileNotification(false)}>
              <DialogTitle>
              <Typography variant='body1' style={{fontWeight: "bold"}}>Notifications</Typography>
              </DialogTitle>
              <DialogContent>
                  <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                  <AccordionSummary
                    expandIcon={<Chip
                      className={classes.chipMessageIcon}
                      label="Read"
                    />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Avatar src="./people.png" alt=""/>
                    <Typography className={classes.heading}>General settings</Typography>
                    <Typography className={classes.secondaryHeading}>23 hours ago</Typography>
                  </AccordionSummary>
                  <Divider/>
                  <AccordionDetails>
                    <Typography>
                      Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                      maximus est, id dignissim quam.
                    </Typography>
                  </AccordionDetails>
                  <Divider variant="middle"/>
                  <AccordionActions>
                    <Button variant="contained" size="small" style={{color: "white",backgroundColor:"red"}}>
                      Delete
                    </Button>
                    <Button size="small" variant="contained" style={{color: "white",backgroundColor:"green"}}>
                      Make read
                    </Button>
                  </AccordionActions>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                  <AccordionSummary
                    expandIcon={<Chip
                      className={classes.receiveMessage}
                      label="Receive"
                    />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Avatar src="./people.png" alt=""/>
                    <Typography className={classes.heading}>General settings</Typography>
                    <Typography className={classes.secondaryHeading}>23 hours ago</Typography>
                  </AccordionSummary>
                  <Divider/>
                  <AccordionDetails>
                    <Typography>
                      Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                      maximus est, id dignissim quam.
                    </Typography>
                  </AccordionDetails>
                  <Divider variant="middle"/>
                  <AccordionActions>
                    <Button variant="contained" size="small" style={{color: "white",backgroundColor:"red"}}>
                      Delete
                    </Button>
                    <Button size="small" variant="contained" style={{color: "white",backgroundColor:"green"}}>
                      Make read
                    </Button>
                  </AccordionActions>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                  <AccordionSummary
                    expandIcon={<Chip
                      className={classes.receiveMessage}
                      label="Receive"
                    />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Avatar src="./people.png" alt=""/>
                    <Typography className={classes.heading}>General settings</Typography>
                    <Typography className={classes.secondaryHeading}>23 hours ago</Typography>
                  </AccordionSummary>
                  <Divider/>
                  <AccordionDetails>
                    <Typography>
                      Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                      maximus est, id dignissim quam.
                    </Typography>
                  </AccordionDetails>
                  <Divider variant="middle"/>
                  <AccordionActions>
                    <Button variant="contained" size="small" style={{color: "white",backgroundColor:"red"}}>
                      Delete
                    </Button>
                    <Button size="small" variant="contained" style={{color: "white",backgroundColor:"green"}}>
                      Make read
                    </Button>
                  </AccordionActions>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                  <AccordionSummary
                    expandIcon={<Chip
                      className={classes.chipMessageIcon}
                      label="Read"
                    />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Avatar src="./people.png" alt=""/>
                    <Typography className={classes.heading}>General settings</Typography>
                    <Typography className={classes.secondaryHeading}>23 hours ago</Typography>
                  </AccordionSummary>
                  <Divider/>
                  <AccordionDetails>
                    <Typography>
                      Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                      maximus est, id dignissim quam.
                    </Typography>
                  </AccordionDetails>
                  <Divider variant="middle"/>
                  <AccordionActions>
                    <Button variant="contained" size="small" style={{color: "white",backgroundColor:"red"}}>
                      Delete
                    </Button>
                    <Button size="small" variant="contained" style={{color: "white",backgroundColor:"green"}}>
                      Make read
                    </Button>
                  </AccordionActions>
                </Accordion>
              </DialogContent>
              <DialogActions className={classes.dialogActionWrap}>
              <Button onClick={() => setopenMobileNotification(false)}
              endIcon={<ClearIcon/>}
              variant="outlined"
              style={{color: "red"}}>
            Close
          </Button>
          <Button style={{color: "green"}}
          variant="outlined"
          endIcon={<DoneAllIcon/>}>
            Make all read
          </Button>
              </DialogActions>
      </Dialog>
      <MenuItem onClick={() => history.push("/user")}>
        <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={ () => setmobileHandleLOgout(true) }>
          <IconButton
              color="inherit"
              >
              <ExitToAppIcon  />
            </IconButton>
        <p>Logout</p>
      </MenuItem>
          <Dialog
            open={mobileHandleLOgout}
            onClose={() => setmobileHandleLOgout(false) }
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">{"Logout?"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
              Do you really want to log out?
              </DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button autoFocus onClick={ () => setmobileHandleLOgout(false) } color="primary">
                Cancel
              </Button>
              <Button onClick={onLogout} 
              color="primary" autoFocus>
                Sure!
              </Button>
            </DialogActions>
          </Dialog>
    </Menu>
  );
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <Avatar className={classes.avatarLarge} alt="logo" src="./logo.png" />
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
                </div>
                <InputBase
                placeholder="Search…"
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                />
            </div>
         
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <div className={classes.root}>
                <Chip
                  style={{fontWeight: "bold",color:"white"}}
                  avatar={
                    !globalState.state.loading ?
                    <Avatar alt="Natacha" src={globalState.state.credentials.imageUrl} />
                    :
                    <Skeleton variant="circle" height={25} width={25} />
                  }
                  label="Ngô Hữu Văn"
                  onClick={handleGoToUser}
                  variant="outlined" 
                />
            </div>
            <IconButton onClick={() => setopenNotification(!openNotification)} aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Dialog TransitionComponent={Transition} fullWidth
            open={openNotification} onClose={() => setopenNotification(false)}>
              <DialogTitle>
              <Typography variant='body1' style={{fontWeight: "bold"}}>Notifications</Typography>
              </DialogTitle>
              <DialogContent>
                  <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                  <AccordionSummary
                    expandIcon={<Chip
                      className={classes.chipMessageIcon}
                      label="Read"
                    />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Avatar src="./people.png" alt=""/>
                    <Typography className={classes.heading}>General settings</Typography>
                    <Typography className={classes.secondaryHeading}>23 hours ago</Typography>
                  </AccordionSummary>
                  <Divider/>
                  <AccordionDetails>
                    <Typography>
                      Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                      maximus est, id dignissim quam.
                    </Typography>
                  </AccordionDetails>
                  <Divider variant="middle"/>
                  <AccordionActions>
                    <Button variant="contained" size="small" style={{color: "white",backgroundColor:"red"}}>
                      Delete
                    </Button>
                    <Button size="small" variant="contained" style={{color: "white",backgroundColor:"green"}}>
                      Make read
                    </Button>
                  </AccordionActions>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                  <AccordionSummary
                    expandIcon={<Chip
                      className={classes.receiveMessage}
                      label="Receive"
                    />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Avatar src="./people.png" alt=""/>
                    <Typography className={classes.heading}>General settings</Typography>
                    <Typography className={classes.secondaryHeading}>23 hours ago</Typography>
                  </AccordionSummary>
                  <Divider/>
                  <AccordionDetails>
                    <Typography>
                      Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                      maximus est, id dignissim quam.
                    </Typography>
                  </AccordionDetails>
                  <Divider variant="middle"/>
                  <AccordionActions>
                    <Button variant="contained" size="small" style={{color: "white",backgroundColor:"red"}}>
                      Delete
                    </Button>
                    <Button size="small" variant="contained" style={{color: "white",backgroundColor:"green"}}>
                      Make read
                    </Button>
                  </AccordionActions>
                </Accordion>
                <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                  <AccordionSummary
                    expandIcon={<Chip
                      className={classes.receiveMessage}
                      label="Receive"
                    />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Avatar src="./people.png" alt=""/>
                    <Typography className={classes.heading}>General settings</Typography>
                    <Typography className={classes.secondaryHeading}>23 hours ago</Typography>
                  </AccordionSummary>
                  <Divider/>
                  <AccordionDetails>
                    <Typography>
                      Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                      maximus est, id dignissim quam.
                    </Typography>
                  </AccordionDetails>
                  <Divider variant="middle"/>
                  <AccordionActions>
                    <Button variant="contained" size="small" style={{color: "white",backgroundColor:"red"}}>
                      Delete
                    </Button>
                    <Button size="small" variant="contained" style={{color: "white",backgroundColor:"green"}}>
                      Make read
                    </Button>
                  </AccordionActions>
                </Accordion>
                <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                  <AccordionSummary
                    expandIcon={<Chip
                      className={classes.chipMessageIcon}
                      label="Read"
                    />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Avatar src="./people.png" alt=""/>
                    <Typography className={classes.heading}>General settings</Typography>
                    <Typography className={classes.secondaryHeading}>23 hours ago</Typography>
                  </AccordionSummary>
                  <Divider/>
                  <AccordionDetails>
                    <Typography>
                      Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                      maximus est, id dignissim quam.
                    </Typography>
                  </AccordionDetails>
                  <Divider variant="middle"/>
                  <AccordionActions>
                    <Button variant="contained" size="small" style={{color: "white",backgroundColor:"red"}}>
                      Delete
                    </Button>
                    <Button size="small" variant="contained" style={{color: "white",backgroundColor:"green"}}>
                      Make read
                    </Button>
                  </AccordionActions>
                </Accordion>
              </DialogContent>
              <DialogActions className={classes.dialogActionWrap}>
              <Button onClick={() => setopenNotification(false)}
              endIcon={<ClearIcon/>}
              variant="outlined"
              style={{color: "red"}}>
            Close
          </Button>
          <Button style={{color: "green"}}
          variant="outlined"
          endIcon={<DoneAllIcon/>}>
            Make all read
          </Button>
              </DialogActions>
            </Dialog>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={ handleClickOpen }
              >
              <ExitToAppIcon  />
            </IconButton>
            <Dialog
                fullScreen={fullScreen}
                open={openLogout}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
              >
                <DialogTitle id="responsive-dialog-title">{"Logout?"}</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                  Do you really want to log out?
                  </DialogContentText>
                </DialogContent>

                <DialogActions>
                  <Button autoFocus onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={onLogout} 
                  color="primary" autoFocus>
                    Sure!
                  </Button>
                </DialogActions>
              </Dialog>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
