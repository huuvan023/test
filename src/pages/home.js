import React, { useContext } from 'react'
import Grid from '@material-ui/core/Grid';
import { CssBaseline } from '@material-ui/core';
import NavBar from '../components/navbar';
import { useEffect, useState } from 'react';
import User from '../components/user';
import Screams from '../components/screams';
import ListUser from '../components/listUser';
import Hidden from '@material-ui/core/Hidden';
import Skeleton from '@material-ui/lab/Skeleton';
import { store } from './../store/store'
import { httpClient } from './../config/httpClient'
import PostStatus from '../components/post';


export default function Home() {
    const globalState = useContext(store)
    const { dispatch } = globalState;

    //const globalState = useContext(store)
    //console.log(globalState)
    //const { dispatch } = globalState;
    //dispatch({type:"aa"})

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
    }, [])    
      
    useEffect(()=>{
        fetchData()
        return () => true;
    },[])

    return (
        <Grid container >
            <CssBaseline/>
            <Grid item xs={12}>
                <NavBar/>
            </Grid>

            <Grid item sm={4} xs={12}>
                <User loading={globalState.state.loading} />
            </Grid>
            <Grid style={{marginTop: 20}} item sm={5} xs={12}>
                {  !globalState.state.loading ? 
                (
                    <React.Fragment>
                        <PostStatus/>
                        { globalState.state.screams.length > 0 ? globalState.state.screams.map((item,index) => <Screams item={item} key ={ index }/> ) : ""}
                    </React.Fragment>
                    
                )
                :
                (
                    <Grid style={{marginTop: "15px"}}>
                        <Skeleton style={{marginBottom: "15px",width:"100%"}} variant="rect" height={118} />
                        <Skeleton style={{marginBottom: "15px",width:"100%"}} variant="rect" height={118} />
                        <Skeleton style={{marginBottom: "15px",width:"100%"}} variant="rect" height={118} />
                        <Skeleton style={{marginBottom: "15px",width:"100%"}} variant="rect" height={118} />
                        <Skeleton style={{marginBottom: "15px",width:"100%"}} variant="rect" height={118} />
                    </Grid>
                )
                 }
            </Grid>
            <Hidden only={['xs']}>
                <Grid item sm={3} xs={12}>
                    <ListUser/>
                </Grid>
            </Hidden>
        </Grid>
    ) 
}
