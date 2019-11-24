import React from 'react';
import RenderRecords from './renderRecords';
import {withFirebaseContext} from '../containers/Firebase';
import { Button } from '@material-ui/core';
import Router from 'next/router'

const Data = (props) => {
    const [records, setRecords] = React.useState(null);
    const [call, setCall] = React.useState(false);
    React.useEffect(() => {
       if(props.firebase.app !== null && !call) {
            props.firebase.getData()
            setCall(true)
       } else {
        console.log('Not Calling')
       }
       if(props.firebase.records ) {
        setRecords(props.firebase.records)
       }
    });

    if(props.firebase.app === null) {
        return (
            <span>Loading database....</span>
        )
    }


    return (
        <div>
            <h1>Showing All Records</h1>
            <RenderRecords records={records}/>
            <Button color="secondary" 
                onClick={async() => {
                    await props.firebase.deleteData()
                    Router.push('/') 
                }
                }>
                Delete All Data
            </Button>
        </div>
    )
}

export default withFirebaseContext(Data)
