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
            <ExcelFile element={<Button 
                    variant="contained" 
                    color="primary"
                    className={this.props.classes.btn}
                    >Download</Button>}>
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

export default withStyles(styles)(Excell);
