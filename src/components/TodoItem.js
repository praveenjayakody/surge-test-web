import React from "react";
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Divider from '@material-ui/core/Divider';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { 
  Edit as EditIcon, 
  Delete as DeleteIcon
} from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
}));


export default function TodoItem(props) {
  const classes = useStyles();


  return (
    <Grid container style={{marginTop: 5, marginBottom: 5}}>
        <Grid item xs={12} lg={12}>
            <Paper elevation={1} style={{padding: 10}}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <ToggleButtonGroup
                            orientation="horizontal"
                            value={props.status ?? "todo"}
                            exclusive
                            onChange={(e, s) => props.onStatusChange(e, s)}
                        >
                            <ToggleButton value="todo" aria-label="todo">
                                Todo
                            </ToggleButton>
                            <ToggleButton value="progress" aria-label="progress">
                                In-progress
                            </ToggleButton>
                            <ToggleButton value="done" aria-label="done">
                                Done
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid item>
                        <IconButton aria-label="upload picture" component="span" onClick={props.onEdit}>
                            <EditIcon />
                        </IconButton>
                        <IconButton color="primary" aria-label="upload picture" component="span" onClick={props.onDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
                <Divider style={{marginTop: 10, marginBottom: 10}} />
                <Typography variant="body1">
                    {props.text ?? ""}
                </Typography>
            </Paper>
        </Grid>
    </Grid>
  );
}
