import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
interface roomProps {
  chatRoom: string;
}
const InfoBar = ({ chatRoom }: roomProps) => {
  const classes = useStyles();
  return (
    <Paper elevation={0} className={classes.infoBarColor}>
      <Typography variant="h6">Chat & Answers </Typography>
    </Paper>
  );
};

export default InfoBar;

const useStyles = makeStyles((theme) => ({
  infoBarColor: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light,
    padding: '3.4%',
  },
}));
