import React from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import UserPoints from './userPoints';
import { makeStyles } from '@material-ui/core/styles';

function PointsChart({ players }: any) {
  const classes = useStyles();
  return (
    <Grid item container direction="column">
      <Paper elevation={3} className={classes.paperStyles}>
        <Paper elevation={0} className={classes.canvasBar}>
          <Typography variant="h6">Point Table</Typography>
        </Paper>
        
          {players.map((player: any, i: string | number | undefined) => (
            <div key={i}>
              <UserPoints player={player} />
            </div>
          ))}
        
      </Paper>
    </Grid>
  );
}
const useStyles = makeStyles((theme) => ({
  canvasBar: {
    alignContent: 'center',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light,
    padding: '3.4%',
  },
  paperStyles: {
    minHeight: '480px',
    maxHeight: '480px',
    padding: '1%',
  },
}));
export default PointsChart;
