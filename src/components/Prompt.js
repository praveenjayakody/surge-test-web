import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Prompt(props) {
    const [text, setText] = useState("");

    const _cancel = () => {
        setText("");
        props.onCancel();
    }
    const _submit  = () => {
        setText("");
        props.onSubmit(text);
    }

    return (
        <Dialog
            open={props.open}
            onClose={_cancel}
            aria-labelledby="form-dialog-title"
            fullWidth={true}
            maxWidth={"sm"}
        >
            <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{props.text}</DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="text"
                label="Note"
                type="text"
                onChange={(e) => setText(e.target.value)}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={_cancel} color="primary">
                Cancel
              </Button>
              <Button onClick={_submit} color="primary">
                Done
              </Button>
            </DialogActions>
        </Dialog>
    );
}