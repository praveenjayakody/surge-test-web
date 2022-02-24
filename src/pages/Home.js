import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import Navigation from "../components/Navigation";
import TodoItem from "../components/TodoItem";
import Prompt from "../components/Prompt";

import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

import AddIcon from '@material-ui/icons/Add';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import Snackbar from '@material-ui/core/Snackbar';
import Fab from '@material-ui/core/Fab';

import { Todo } from '../util/Api/Todo.js'

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function Home() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [todos, setTodos] = useState(undefined);
  const [toast, setToast] = useState(undefined);
  const [promptShown, setPromptShown] = useState(false);

  const _loadTodos = () => {
    Todo.list().then(async (resp) => {
      if (resp.status === 200) {
        setTodos(await resp.json());
      }
    }).catch((e) => {
      console.log(e);
      setToast("Unexpected error ocurred");
    });
  }
  useEffect(_loadTodos, []);

  const _handleStatus = async (id, status) => {
    const resp = await Todo.update(id, { status: status });

    if (typeof resp.error === "undefined" && resp.status === 200) {
      // update UI
      setTodos(
        todos.map(t => t.id === id ? {...t, status: status }: t)
      );
      setToast("Changed status to " + status);
    } else {
      setToast("Unable to change status");
    }
  }

  const _addTodo = async (t) => {
    setPromptShown(false);
    const resp = await Todo.store({
      status: "todo",
      content: t
    });

    if (resp.status === 201) {
      _loadTodos();
    } else {
      setToast("Could not add new todo");
    }
  }

  return (<div className={classes.root}>
		<CssBaseline />
    <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => setPromptShown(true)}>
      <AddIcon />
    </Fab>
    <Prompt
      open={promptShown}
      title={"Add new todo"}
      text={"Enter todo description"}
      onCancel={() => setPromptShown(false)}
      onSubmit={_addTodo}
    />
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={typeof toast !== "undefined"}
      autoHideDuration={6000}
      onClose={() => setToast(undefined)}
      message={toast}
    />
		<Navigation title="Home" />
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={1} direction="row">
          {typeof todos !== "undefined" ?
            todos.map((t, i) => 
              <Grid item key={i} xs={12} lg={6}>
                <TodoItem
                  status={t.status}
                  text={t.content}
                  onStatusChange={(e, status) => status !== null ? _handleStatus(t.id, status): ""}
                  onEdit={() => console.log("")}
                />
              </Grid>
            ):
            <>
              <Skeleton variant="rect" width={"100%"} height={118} />
              <Skeleton variant="text" width={"50%"}/>
              <Skeleton variant="rect" width={"100%"} height={118} style={{marginTop: 10}} />
              <Skeleton variant="text" width={"50%"}/>
            </>
          }
        </Grid>
      </Container>
    </main>
  </div>);
}
