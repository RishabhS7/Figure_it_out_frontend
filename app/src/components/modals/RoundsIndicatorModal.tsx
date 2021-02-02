import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  paper: {
    backgroundColor: '#843501',
    color: 'white',
    padding: theme.spacing(2, 4, 3),
    minHeight: '15%',
    minWidth: '20%',
  },
}));
interface props {
  roundsIndicatorModalOpen: boolean;
  currentRound: number;
}

export default function PointsIndicatorModal({
  currentRound,
  roundsIndicatorModalOpen
}: props): JSX.Element {
  const classes = useStyles();

  const handleClose = () => {
    // setRoundsIndicatorModalOpen(false);
    console.log("runs")
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={roundsIndicatorModalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={roundsIndicatorModalOpen}>
          <div className={classes.paper}>
            
                <Grid container direction="row">
                    <Typography>Round {currentRound}</Typography>
                </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
