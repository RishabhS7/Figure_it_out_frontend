import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper, Grid } from '@material-ui/core';

function CanvasBar({ userName, activePlayer, selectedWord }: any) {
  const classes = useStyles();
  const chorus = '_ ';
  const n = selectedWord.length;
  const hiddenWord = chorus.repeat(n);

  return activePlayer ? (
    activePlayer == userName ? (
      <Paper elevation={3} className={classes.canvasBar}>
        <Grid container xs>
          <Grid xs={7} container justify="flex-end" alignItems="flex-end">
            <Typography variant="h4">Figure It Out</Typography>
          </Grid>
          <Grid xs container justify="flex-end" alignItems="flex-end">
            <Typography>You are drawing.. {selectedWord}</Typography>
          </Grid>
        </Grid>
      </Paper>
    ) : (
      <Paper elevation={3} className={classes.canvasBar}>
        <Grid container xs>
          <Grid xs={7} container justify="flex-end" alignItems="flex-end">
            <Typography variant="h4">Figure It Out</Typography>
          </Grid>
          <Grid xs container justify="flex-end" alignItems="flex-end">
            <Typography>
              {activePlayer} is drawing.. {hiddenWord}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    )
  ) : (
    <Paper elevation={3} className={classes.canvasBar}>
      <Grid container xs>
        <Grid xs={7} container justify="flex-end" alignItems="center">
          <Typography variant="h4">Figure It Out !</Typography>
        </Grid>
        <Grid xs container justify="flex-end" alignItems="flex-end">
          <Typography>Hi {userName}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}
const useStyles = makeStyles((theme) => ({
  canvasBar: {
    padding: '1.1%',
    backgroundColor: '#F85C01',
    color: 'white',
  },
  typography1: {
    alignSelf: 'right',
    display: 'flex',
    justifyContent: 'flex-end',
    justify: 'flex-end',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));

export default CanvasBar;
