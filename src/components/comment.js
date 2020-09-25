import { Avatar, Box, Grid, Typography } from '@material-ui/core'
import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(5),
      height: theme.spacing(5),
    }
}));
export default function Comment() {
    const classes = useStyles();

    return (
        <Fragment>
            <Grid container style={{marginTop:"10px"}}>
                <Grid item>
                   <Box style={{height:"100%"}} display="flex" alignItems="start">
                   <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.small} />
                   </Box>
                </Grid>
                <Grid xs={10} item>
                    <Typography style={{fontWeight: "bold"}}>User name</Typography>
                    <Typography>There is comment test xxxx
                      asdasD
                      SAdad
                      ASdAS
                      Dsa
                      xxxxxxxxxxxxxxxxx</Typography>
                </Grid>
            </Grid>
        </Fragment>
    )
}
