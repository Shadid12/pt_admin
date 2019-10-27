import React from "react";
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
    {
        name: "Johson",
        amount: 30000,
        sex: 'M',
        is_married: true
    },
    {
        name: "Monika",
        amount: 355000,
        sex: 'F',
        is_married: false
    },
    {
        name: "John",
        amount: 250000,
        sex: 'M',
        is_married: false
    },
    {
        name: "Josef",
        amount: 450500,
        sex: 'M',
        is_married: true
    }
];

const dataSet2 = [
    {
        name: "Johnson",
        total: 25,
        remainig: 16
    },
    {
        name: "Josef",
        total: 25,
        remainig: 7
    }
];

class Excell extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSet1: []
        }
    }

    componentWillMount() {
        const {data} = this.props
        
        let dataSet = []

        for (let [key, value] of Object.entries(data.item)) {
            let payload = {}

            payload.name = data.name
            let street = value.payload.split('|R04~')[1].split('|')[0]
            payload.street = street;
            let city = value.payload.split('|R06~')[1].split('|')[0]
            payload.city = city;
            let postal = value.payload.split('|R07~')[1].split('|')[0]
            payload.postal = postal;
            dataSet.push(payload)
        }
        this.setState({dataSet1: dataSet})
    }

    render() {
        return (
            <ExcelFile>
                <ExcelSheet data={this.state.dataSet1} name="Delivery">
                    <ExcelColumn label="Name" value="name"/>
                    <ExcelColumn label="Street" value="street"/>
                    <ExcelColumn label="City" value="city"/>
                    <ExcelColumn label="Postal" value="postal"/>
                </ExcelSheet>
            </ExcelFile>
        );
    }
}

export default Excell;
