import React, { useRef } from 'react'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import CardContent from '@material-ui/core/CardContent';
import { DialogContent, DialogTitle, Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import CommentIcon from '@material-ui/icons/Comment';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { orange } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Collapse from '@material-ui/core/Collapse';
import SendIcon from '@material-ui/icons/Send';
import Comment from './comment';
const useStyles = makeStyles((theme) => ({
    themeProvider: {
        color: "red",
    },
    cmAndExpand: {
        color: "#1E9BE5",
    },
    cardContainer: {
        margin: theme.spacing(2,2),
        "&:hover": {
            backgroundColor: 'white'
          }
    },
    cardBody: {
        padding: theme.spacing(3,2,0,2),
        backgroundColor: "white",
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "white",
        }
    },
    avatar: {
        marginRight: theme.spacing(2)
    },
    bodyComponent: {
        marginTop: theme.spacing(1)
    },
    boxItem: {
        cursor: "pointer",
        padding: theme.spacing(1,1,0,1)
    },
    seeMore: {
        display: "none",
        color: "blue",
        cursor: "pointer",
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            textDecoration: "underline",
        }
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    } 
}))

const theme = createMuiTheme({
    status: {
      danger: orange[500],
    },
});


export default function Screams(item) {
    let data = item.item;
    const classes = useStyles();
    const refContainer = useRef('');
    dayjs.extend(relativeTime);
    let [like,setLike] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openComment, setOpenComment] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
        setOpenComment(false)
    };

    const handleClose = () => {
        setOpen(false);
    };
    function createMarkup(title) {
        return {__html: title };
    }

    return (
        <React.Fragment>
        <Dialog
        open={open} scroll='body'
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            <Box alignItems="center" display="flex">
                <Avatar alt="" className={ classes.avatar } src={data.userImage}/> 
                <Grid>
                    <Typography variant="h5">{ data.userHandle }</Typography>
                    <Typography style={{ color:"#8e8b8b" }} variant="caption">{ dayjs(data.createAt).fromNow() }</Typography>
                </Grid>
                <IconButton aria-label="close" className={classes.closeButton}
                onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
        </DialogTitle>
        <Card >
        <CardContent className = { classes.cardBody }>
            <Box className={classes.bodyComponent}>
                <Typography dangerouslySetInnerHTML={createMarkup(data.body)} variant="body1"></Typography>
            </Box>
            <Box display="flex">
                <Box className={ classes.boxItem }
                onClick={ () => setLike(!like) } flexGrow={1}>
                    <ThemeProvider theme={theme}>
                        <Fab aria-label="like" 
                        variant="round" 
                        size="small" 
                        classes={{
                            root: classes.themeProvider,
                        }}
                        style={{backgroundColor:"transparent", boxShadow:"none"}} >
                            { like ? 
                            (
                            <FavoriteIcon/>  
                            )
                            :
                            (<FavoriteBorderIcon />)
                            }
                        </Fab>
                    </ThemeProvider>
                    Like
                </Box>
                <Box style={{textAlign:"center"}} className={ classes.boxItem } flexGrow={2}>
                    <ThemeProvider theme={theme}>
                        <Fab aria-label="like" 
                        variant="round" 
                        classes={{
                            root: classes.cmAndExpand,
                        }} 
                        size="small" 
                        style={{backgroundColor:"transparent", boxShadow:"none"}} >
                            <CommentIcon style={{color:"#1E9BE5"}}/>
                        </Fab>
                    </ThemeProvider>
                    Comments
                </Box>
                <Box style={{textAlign:"right"}} className={ classes.boxItem } flexGrow={2}>
                    <ThemeProvider theme={theme}>
                        <Fab aria-label="like" 
                        variant="round" 
                        classes={{
                            root: classes.cmAndExpand,
                        }} 
                        size="small" 
                        style={{backgroundColor:"transparent", boxShadow:"none"}} >
                            <ShareIcon style={{color:"#1E9BE5"}}/>
                        </Fab>
                    </ThemeProvider>
                    Share
                </Box>
            </Box>
            <TextField label="Type your comment"
                style={{marginTop: "20px"}}
                fullWidth rowsMax={2} multiline={true}
                variant="outlined"
                InputProps={{
                    endAdornment: (
                        <InputAdornment onClick={() => console.log('asd')} position="end">
                        <IconButton aria-label="delete">
                            <SendIcon />
                        </IconButton>
                        </InputAdornment>
                    ),
                    }}/>
            <br/>
            <br/>
            <Typography style={{fontWeight:"bold",textTransform:"uppercase"}}>
                Comment:
            </Typography>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
        </CardContent>


</Card>
      </Dialog>
    <Card className={ classes.cardContainer }>
        
                    <CardContent className = { classes.cardBody } >
                        <Box alignItems="center" display="flex">
                            <Avatar alt="" className={ classes.avatar } src={data.userImage}/> 
                            <Grid>
                                <Typography variant="h5">{ data.userHandle }</Typography>
                                <Typography style={{ color:"#8e8b8b" }} variant="caption">{ dayjs(data.createAt).fromNow() }</Typography>
                            </Grid>
                        </Box>
                        <Box className={classes.bodyComponent}>
                            <Typography ref={refContainer} dangerouslySetInnerHTML={createMarkup(data.body)} variant="body1"></Typography>
                            <span onClick={handleClickOpen} className={classes.seeMore}>See more...</span>
                        </Box>
                        <Box display="flex">
                            <Box className={ classes.boxItem } onClick={ () => setLike(!like) } flexGrow={1}>
                                <ThemeProvider theme={theme}>
                                    <Fab aria-label="like" 
                                    variant="round" 
                                    size="small" 
                                    classes={{
                                        root: classes.themeProvider,
                                    }}
                                    style={{backgroundColor:"transparent", boxShadow:"none"}} >
                                        { like ? 
                                        (
                                        <FavoriteIcon/>  
                                        )
                                        :
                                        (<FavoriteBorderIcon />)
                                        }
                                    </Fab>
                                </ThemeProvider>
                                Like
                            </Box>
                            <Box className={ classes.boxItem } flexGrow={2} onClick= {() => setOpenComment(!openComment)}>
                                <ThemeProvider theme={theme}>
                                    <Fab aria-label="like" 
                                    variant="round" 
                                    classes={{
                                        root: classes.cmAndExpand,
                                    }} 
                                    size="small" 
                                    style={{backgroundColor:"transparent", boxShadow:"none"}} >
                                        <CommentIcon style={{color:"#1E9BE5"}}/>
                                    </Fab>
                                </ThemeProvider>
                                Comments
                            </Box>
                            <Box className={ classes.boxItem }  onClick={handleClickOpen}>
                                <ThemeProvider theme={theme}>
                                    <Fab aria-label="like" 
                                    variant="round"
                                    classes={{
                                        root: classes.cmAndExpand,
                                    }} 
                                    size="small" 
                                    style={{backgroundColor:"transparent", boxShadow:"none"}} >
                                        <UnfoldMoreIcon style={{color:"#1E9BE5"}}/>
                                    </Fab>
                                </ThemeProvider>
                            </Box>
                        </Box>
                        <Collapse in={openComment}>
                            <TextField label="Type your comment"
                                fullWidth rowsMax={2} multiline={true}
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                    <InputAdornment onClick={() => console.log('asd')} position="end">
                                        <IconButton aria-label="delete">
                                            <SendIcon />
                                        </IconButton>
                                    </InputAdornment>
                                    ),
                                }}/>
                        </Collapse>
                    </CardContent>
            
        
    </Card>
    </React.Fragment>
    )
}
