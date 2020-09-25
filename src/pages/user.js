import React, { useContext, useRef, useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import { CssBaseline } from '@material-ui/core';
import NavBar from '../components/navbar';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import * as constants from './../store/constants'
import User from '../components/user';
import Screams from '../components/screams';
import ListUser from '../components/listUser';
import Skeleton from '@material-ui/lab/Skeleton';
import { store } from './../store/store'
import { httpClient } from './../config/httpClient'
import PostStatus from '../components/post';
import GoogleMapReact from 'google-map-react';
import Card from '@material-ui/core/Card';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { 
    Divider, 
    Box, 
    Avatar ,
    Fab,
    Badge,
    Typography
    } from '@material-ui/core';
import blueGrey from '@material-ui/core/colors/blueGrey';
import lightBlue from '@material-ui/core/colors/lightBlue';
import LinkIcon from '@material-ui/icons/Link';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import Hidden from '@material-ui/core/Hidden';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "0 auto",
        marginTop: theme.spacing(2)
    },
    cardWrap: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        padding: theme.spacing(2)
    },
    boxWrap: {
        padding: theme.spacing(2),
        width: "100%"
    },
    boxItem: {
        marginTop: theme.spacing(1),
    },
    fabIconCustom: {
        backgroundColor: blueGrey[200],
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: blueGrey[300]
        },
        border: `1.2px solid ${theme.palette.background.paper}`,
    },
    avatar: {
        border: '1px solid black',
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
    iconItem: {
        color: lightBlue[600]
    },
    ggmapWap: {
        height: "50vh",
        width: "100%",
        margin: theme.spacing(2)
    }
}))

export default function UserProfile() {
    const classes = useStyles();
    const globalState = useContext(store)
    const uploadFile = useRef();
    let [loading,setLoading] = useState(false)
    let [uData,setUData] = useState({})
    const [edit, setEdit] = useState(false)
    let [editProfile, setEditProfile] = useState({});

    const { dispatch } = globalState;

    const fetchData = React.useCallback(async () => {
        await dispatch({
            type: "SET_LOADING"
        })
        await httpClient.get("/user")
        .then( res => {
            dispatch({
                type: "FETCH_USER",
                payload: res.uData,
            })
        })
        
        await httpClient.get('/screams')
        .then(data => { 
            dispatch({
                type: "FETCH_SCREAMS",
                payload: data,
            })
        })
        .catch((error) => {
          throw error
        })
        await dispatch({
            type: "SET_DONELOADING"
        })
        setLoading(false)
    }, [])    
      
    useEffect(()=>{
        setLoading(true)
        fetchData()
        return () => true;
    },[])
    //const globalState = useContext(store)
    //console.log(globalState)
    //const { dispatch } = globalState;
    //dispatch({type:"aa"})
    const changeAvatar = () => {

    }
    //Open modal to edit user
    const onOpenEdit = () => {
        setEdit(true)
    }
    //Close modal edit user
    const onCloseEdit = () => {
        setEdit(false)
    }
    const onUploadImage = () => {

    }
    const onChangeProfile = (e) => {
        setEditProfile({
            ...editProfile,
            [e.target.name]:[e.target.value]
        })
    }
    //UPload new avatar
    const onChangeAvatar = async (e) => {
        if(e.target.files[0]) {
            const image = e.target.files[0];
            const formData = new FormData();
            formData.append('image',image,image.name)
            /*await axios.post("/user/image",formData)
            .then((res) => {
                return fetchData();
            })
            .then(() => {
                toast.success('Update avatar successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            })
            .catch( error => {
                swal({
                    title: "Error!",
                    button: false,
                    text: error.response.data.error,
                    icon: "error",
                })
                .then(() => {
                    setLoading(false)
                })
            })*/
        }
    }
    const onSubmitChange = () => {

    }
    //test api
    const AnyReactComponent = ({ text }) => <div>{text}</div>;
    return !(globalState.state.screams.length > 0)  ? (<div>Loading</div>)
    :
    (
        <Grid container >
            <CssBaseline/>
            <Grid item xs={12}>
                <NavBar/>
            </Grid>

            <Grid className={classes.root} container item xs={10}>
                <Grid item style={{maxHeight:"10vh"}} container md={5}>
                    <Hidden only={['sm','xs']}>
                        <Card style={{width:"100%"}} className={classes.cardWrap}>
                            <Box className={classes.boxWrap} justifyContent="center" display="flex" >
                            <input ref={ uploadFile } type="file" id="uploadImage" onChange={ onChangeAvatar }  style={{ display: "none" }}/>
                            <Badge
                                    overlap="circle"
                                    anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                    }}
                                    badgeContent={
                                        <Fab className={ classes.fabIconCustom } 
                                            size="small" color="secondary" 
                                            onClick={() => uploadFile.current.click()}
                                            aria-label="edit">
                                            <CameraAltIcon />
                                        </Fab>
                                    }>
                                    <Avatar className={ classes.avatar } alt="" src='./people.png'/> 
                                </Badge>
                            </Box>
                            <Box className={classes.boxItem} display="flex" justifyContent="center">
                                <Typography style={{fontWeight:"bold",fontFamily: 'Belgrano'}} variant="h4" >
                                    Ngô Hữu Văn
                                </Typography>
                            </Box>
                            <Box className={classes.boxItem} display="flex" justifyContent="center">
                                <Typography variant="caption" style={{color:"red",fontWeight:"bold"}}>
                                    @handleName
                                </Typography>
                            </Box>
                            <Box className={classes.boxItem} display="flex" justifyContent="center">
                                <Typography>
                                    This is yout bio =)
                                </Typography>
                            </Box>
                            <Divider style={{margin:"15px 0"}}/>
                            <Box className={classes.boxItem} display="flex" justifyContent="center">
                                <PersonPinIcon className={ classes.iconItem }/>
                                <Typography align="center" color="textPrimary" variant="body2">
                                    This is your locationasdnasdas dasd as,dna,dmasnd,masdas,dnas,dnas,
                                </Typography>
                            </Box>
                            <Box className={classes.boxItem} display="flex" justifyContent="center">
                                <LinkIcon className={ classes.iconItem }/>
                                <Typography align="center" color="textPrimary" variant="body2">
                                    This is your websitea aaaaaaaaaa xxx xxx xxx xxx xxxasd
                                    asda
                                    sdasd
                                    asd
                                    asd
                                    asd
                                    asd
                                    asda
                                    dasdad
                                    asd
                                </Typography>
                            </Box>
                            <Box className={classes.boxItem} display="flex" justifyContent="center">
                                <PermContactCalendarIcon className={ classes.iconItem }/>
                                <Typography align="center" color="textPrimary" variant="body2">
                                    Joined, 23days ago {/*dayjs(globalState.state.credentials.createdAt).fromNow()*/}
                                </Typography>
                            </Box>
                            <Box display="flex" justifyContent="flex-end">
                                <IconButton onClick={ onOpenEdit } aria-label="delete">
                                    <EditIcon />
                                </IconButton>
                                <Dialog style={{ width:"50%",margin:"0 auto"}} open={edit}
                                onClose={onCloseEdit} aria-labelledby="form-dialog-title">
                                    <DialogTitle className={ classes.formTitle } id="form-dialog-title">Edit user profile</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText className={ classes.formTitle } >
                                        Change your information so that everyone can recognize you easily!
                                    </DialogContentText>
                                    <TextField  
                                        autoFocus
                                        margin="dense"
                                        onChange={ onChangeProfile }
                                        name="bio"
                                        label="Your Bio"
                                        type="text"
                                        fullWidth
                                    />
                                    <TextField
                                        margin="dense"
                                        name="website"
                                        onChange={ onChangeProfile }
                                        label="Your Website"
                                        type="text"
                                        fullWidth
                                    />
                                    <TextField
                                        margin="dense"
                                        onChange={ onChangeProfile }
                                        name="location"
                                        label="Your Location"
                                        type="text"
                                        fullWidth
                                    />
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={onCloseEdit} color="primary">
                                        CANCEL
                                    </Button>
                                    <Button onClick={ onSubmitChange } color="primary">
                                        SAVE
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            </Box>
                        </Card>
                        <Box className={classes.ggmapWap}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyDTy-wSdaXAapQ0NBRdtFn1BDF2eEdm2JQ' }}
                            defaultCenter={{lat: 59.95,
                                            lng: 30.33}}
                            defaultZoom={11}
                        >
                        <AnyReactComponent
                            lat={59.955413}
                            lng={30.337844}
                            text="My Marker"
                        />
                        </GoogleMapReact>
                        </Box>
                    </Hidden>
                </Grid>
                <Grid item xs={12} md={7}>
                    <PostStatus/>
                    { globalState.state.screams.length > 0 ? globalState.state.screams.map((item,index) => <Screams item={item} key ={ index }/> ) : ""}
                </Grid>
            </Grid>
        </Grid>
    ) 
}
