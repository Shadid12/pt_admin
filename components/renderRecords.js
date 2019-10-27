import React from 'react'

const RenderRecords = (props) => {
    const [list, setList] = React.useState(null);
    React.useEffect(() => {
        const {records} = props;
        if(records) {
            setList(records)
        }
    });

    const downLoadXL = (item) => {
        console.log('---->>>> DATA', item);
    } 

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
                                <button onClick={() => {downLoadXL(item)}}>Download xl</button>
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

export default RenderRecords;