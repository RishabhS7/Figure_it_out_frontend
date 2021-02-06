import React from 'react';
import { makeStyles, Typography, Paper } from '@material-ui/core';

interface props {
  player: any;
}
function UserPoints({
  player: { points, userName, chatRoom },
}: props): JSX.Element {
  const classes = useStyles();
  return (
    <Paper className={classes.usersPointsPaper}>
      <Typography>
        {userName} : {points}
      </Typography>
    </Paper>
  );
}
export default UserPoints;

const useStyles = makeStyles((theme) => ({
  usersPointsPaper: {
    height: '30px',
    marginTop: '2%',
    padding: '4%',
    backgroundColor: '#C38D9E',
    color: 'white',
    // backgroundColor: theme.palette.primary.dark
  },
}));
