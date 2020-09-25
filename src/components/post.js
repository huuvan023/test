import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import SendIcon from '@material-ui/icons/Send';
import { httpClient } from '../config/httpClient';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  titlePost: {
      marginBottom: 10
  },
  button: {
    margin: theme.spacing(1),
  },
  CardActions: {
    float: "right",
    marginRight: 10
  }
}));

export default function PostStatus() {
  const classes = useStyles();
  var [status,setStatus] = useState('');

  const onPostStatus = async () => {
    if (status.trim() !== "") {
      let statusEdited = status.replace(/\r?\n/g,'<br/>')
      console.log(statusEdited)
      await httpClient.post('/scream',{
        body: statusEdited
      })
      setStatus('')
    }
    else {
      setStatus('')
    }
  }
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" className={classes.titlePost} component="p">
          Share your status
        </Typography>
        <TextField
        onChange={ (e) => setStatus(e.target.value) }
        value={status}
        fullWidth rows={2} rowsMax={2} multiline={true}
        placeholder="What are you thinking of ?" variant="outlined" />
      </CardContent>
      <CardActions className={classes.CardActions}>
      <Button
        onClick = {onPostStatus}
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<SendIcon/>}
      >
        Post
      </Button>
      </CardActions>
    </Card>
  );
}