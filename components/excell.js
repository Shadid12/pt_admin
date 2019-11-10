import React from "react";
import ReactExport from "react-export-excel";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;


const styles = {
    btn: {
        textTransform: 'none'
    },
};

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
        let i = 1;
        for (let [key, value] of Object.entries(data.item)) {
            let payload = {}
            let street = value.payload.split('|R04~')[1] ? 
                value.payload.split('|R04~')[1].split('|')[0] : 'NaN'
            payload.street = street;
            let city = value.payload.split('|R06~')[1] ? 
                value.payload.split('|R06~')[1].split('|')[0] : 'NaN'
            payload.city = city;
            let postal = value.payload.split('|R07~')[1] ? 
                value.payload.split('|R07~')[1].split('|')[0] : 'NaN'
            // provience
            payload.prov = 'ON'
            payload.postal = postal;
            // original data
            payload.original = value.payload
            // pin
            let pin = value.payload.split('|S02~')[1] ?  
                value.payload.split('|S02~')[1].split('|')[0] : 'NaN'
            payload.pin = pin
            payload.line = i;
            i++;
            payload.notes = '';
            dataSet.push(payload)
        }
        this.setState({dataSet1: dataSet})
    }

    render() {
        return (
            <ExcelFile element={<Button 
                    variant="contained" 
                    color="primary"
                    className={this.props.classes.btn}
                    >Download</Button>}>
                <ExcelSheet data={this.state.dataSet1} name="Delivery">
                    <ExcelColumn label="Line Number" value="line"/>
                    <ExcelColumn label="Street" value="street"/>
                    <ExcelColumn label="City" value="city"/>
                    <ExcelColumn label="Postal" value="postal"/>
                    <ExcelColumn label="Provience" value="prov"/>
                    <ExcelColumn label="Pin" value="pin"/>
                    <ExcelColumn label="Scaned Data" value="original"/>
                </ExcelSheet>
            </ExcelFile>
        );
    }
}

export default withStyles(styles)(Excell);
