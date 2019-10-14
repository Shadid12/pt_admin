import React from 'react'
import {withFirebaseContext} from '../containers/Firebase';


const Table = (props) => {
    let array = []
    Object.keys(props.item).forEach((key, i) => {
        let data = props.item[key].payload;
        let street = data.split('R04~')[1].split('|')[0]
        let postal = data.split('R07~')[1].split('|')[0]
        let city = data.split('R06~')[1].split('|')[0]
        let payload = {
            street,
            postal,
            city
        }
        array.push(payload)
    })
    return(
        <table>
            <tr>
                <th>Street</th>
                <th>Postal</th> 
                <th>City</th>
            </tr>
            {
                array.map((item) => {
                    return(
                        <tr>
                            <td>
                                {item.street}
                            </td>
                            <td>
                                {item.postal}
                            </td>
                            <td>
                                {item.city}
                            </td>
                        </tr>
                    )
                })
            }
            <style jsx>{`
            table {
                width: 100%;
                border: 1px solid pink;
            };
            td {
                background: beige;
                border: 1px solid lightcyan;
                border-radius: 9px;
            }
            `}</style>
        </table>
    )
}

const RenderRecords = (props) => {
    const [list, setList] = React.useState(null);
    React.useEffect(() => {
        const {records} = props;
        if(records) {
            setList(records)
        }
    });
    if(list) {
        let array = []
        Object.keys(list).forEach((key, i) => {
            let arrPayload = {
                name: key,
                item: list[key]
            }
            array.push(arrPayload)
        })
        return (
            <div>
                {
                    array.map((item) => {
                        return (
                            <div key={item.name}>
                                <span><b>Name: {item.name}</b></span> 
                                <Table item={item.item}/>
                            </div>
                        )
                    })
                }
            </div>
        )
    } else {
        return <div>Loading Data...</div>
    }
}

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
