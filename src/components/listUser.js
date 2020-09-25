import React, { Fragment } from 'react'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import Typography from '@material-ui/core/Typography';
import { 
    Box, 
    CardContent, 
    } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '36ch',
        maxHeight:'50ch',
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto'
    },
      inline: {
        display: 'inline',
        fontWeight: "bold"
    },
    cardContainer: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(1),
        },
        margin: theme.spacing(3,2)
    },
    listItem: {
        width: "100%",
    },
    cardContentContainer: {
        padding: theme.spacing(1,0)
    },
    icon: {
        color:"green"   
    }
    
}))


export default function ListUser() {
    const classes = useStyles();

    return (
        <Card className={ classes.cardContainer }>
            <Box style={{ width: "100%"}} display="flex" justifyContent="center" >
            <CardContent className={classes.cardContentContainer}>
                    <Typography display="block" align="center" 
                        style={{ fontFamily:"Acme" }}
                        variant="h4">
                        Contacts
                    </Typography>
                <List className={classes.root}>
                <ListItem style={{padding: "auto 0"}} alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/avatar.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                    primary={<Typography style={{fontWeight: "bold"}}>Oui Oui</Typography>}
                    secondary={
                        <Fragment> 
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="secondary"
                        >
                            3 screams
                        </Typography>
                        </Fragment>
                    }
                    />
                    <IconButton color="inherit">
                        <Badge color="secondary">
                            <MailIcon className={classes.icon} />
                        </Badge>
                    </IconButton>
                </ListItem>
                <Divider variant="fullWidth" component="li" />
                <ListItem className={ classes.listItem } alignItems="flex-start">
                    <ListItemAvatar>
                    <Avatar alt="Travis Howard" src="/avatar.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                    primary={<Typography style={{fontWeight: "bold"}}>Oui Oui</Typography>}
                    secondary={
                        <Fragment> 
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="secondary"
                        >
                            3 screams
                        </Typography>
                        </Fragment>
                    }
                    />
                    <IconButton color="inherit">
                        <Badge color="secondary">
                            <MailIcon className={classes.icon} />
                        </Badge>
                    </IconButton>
                </ListItem>
                <Divider variant="fullWidth" component="li" />
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                    <Avatar alt="Cindy Baker" src="/avatar.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                    primary={<Typography style={{fontWeight: "bold"}}>Oui Oui</Typography>}
                    secondary={
                        <Fragment> 
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="secondary"
                        >
                            3 screams
                        </Typography>
                        </Fragment>
                    }
                    />
                    <IconButton color="inherit">
                        <Badge color="secondary">
                            <MailIcon className={classes.icon} />
                        </Badge>
                    </IconButton>
                </ListItem>
                </List>
            </CardContent>
            </Box>
        </Card>
    )
}

