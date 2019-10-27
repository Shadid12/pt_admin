import React from 'react'
import Excell from './excell';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    typography: {
        htmlFontSize: 14,
    },
}));

const RenderRecords = (props) => {
    const classes = useStyles();

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
            <div className={classes.root}>
                {
                    array.map((item) => {
                        return (
                            <Grid container spacing={3} key={item.name}>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <Typography>{item.name}</Typography>
                                        <Excell data={item}/>
                                    </Paper>
                                </Grid>
                            </Grid>
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