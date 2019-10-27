import React from 'react';
import RenderRecords from './renderRecords';
import {withFirebaseContext} from '../containers/Firebase';

const Data = (props) => {
    const [records, setRecords] = React.useState(null);
    const [call, setCall] = React.useState(false);
    React.useEffect(() => {
       if(props.firebase.app !== null && !call) {
            console.log('Calling')
            props.firebase.getData();
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
        </div>
    )
}

export default withFirebaseContext(Data)
