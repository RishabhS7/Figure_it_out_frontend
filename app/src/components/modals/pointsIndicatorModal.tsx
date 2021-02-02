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
  pointsIndicatorModalOpen: boolean;
  setPointsIndicatorModalOpen: any;
  players: any;
}

export default function PointsIndicatorModal({
  pointsIndicatorModalOpen,
  setPointsIndicatorModalOpen,
  players,
}: props): JSX.Element {
  const classes = useStyles();

  const handleClose = () => {
    setPointsIndicatorModalOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={pointsIndicatorModalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={pointsIndicatorModalOpen}>
          <div className={classes.paper}>
            <Typography variant="h5">Scores...</Typography>
            {players.map((player: any, i: string | number | undefined) => (
              <div key={i}>
                <Grid container direction="row">
                  <Grid item xs>
                    <Typography>{player.userName} :</Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography>{player.points}</Typography>
                  </Grid>
                </Grid>
              </div>
            ))}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
