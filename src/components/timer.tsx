import React, { useRef, useState, useEffect } from 'react';
import { Paper, makeStyles, Typography } from '@material-ui/core';

const Timer = ({
  time,
  setTime,
  timeIsRunning,
  setTimeIsRunning,
  setPointsIndicatorModalOpen,
  gameStartHandler,
  buttonDisable,
  activePlayer,
  userName
}: any) => {
  const initialtime = time;
  const classes = useStyles();
  const [counter, setCounter] = useState(time);
  useEffect(() => {
     setCounter(time);
}, [time]);
  
  useEffect(() => {
    if (timeIsRunning) {
      const id = setInterval(() => {
        setCounter((timerSeconds: any) => timerSeconds - 1);
      }, 1000);

      return () => clearInterval(id);
    }
    // else(setCounter(time))
  }, [timeIsRunning]);

  if (counter == 0) {
    console.log('something');
    setTimeIsRunning(false);
    setCounter(time);
    if(activePlayer==userName){
    gameStartHandler();
    }
  }
  return (
    <Paper elevation={5} className={classes.timer2Styles}>
      <Paper className={classes.timer1Styles}>
        <Typography variant={'h6'} align={'center'}>
          {counter}
        </Typography>
      </Paper>
    </Paper>
  );
};
export default Timer;
const useStyles = makeStyles((theme) => ({
  timer1Styles: {
    marginTop: '2%',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '6%',
  },
  timer2Styles: {
    marginTop: '2%',
    width: '55px',
    height: '55px',
    borderRadius: '50%',
    padding: '1%',
  },
}));
