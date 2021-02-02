import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Typography } from '@material-ui/core';
const randomWords = require( 'random-words' );

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
    minheight: '15%',
    minWidth: '20%',
  },
  inputButton: {
    width: '90px',
    height: '30px',
    Radius: '2%',
    marginRight: '10px',
  },
}));
interface props {
  wordsIndicatorModalOpen: boolean;
  setWordsIndicatorModalOpen: any;
  setSelectedWordHandler: any;
  userName: string;
  activePlayer: string;
}
export default function WordsIndicatorModal({
  wordsIndicatorModalOpen,
  setWordsIndicatorModalOpen,
  setSelectedWordHandler,
  userName,
  activePlayer,
}: props): JSX.Element {
  const classes = useStyles();
  let generatedRandomWords = randomWords(3);
  useEffect(() => {
    generatedRandomWords = randomWords(3);
  }, [wordsIndicatorModalOpen]);
  // if(wordsIndicatorModalOpen){
  //   generatedRandomWords
  // }

  const handleClose = () => {
    setWordsIndicatorModalOpen(false);
  };

  return userName == activePlayer ? (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={wordsIndicatorModalOpen}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={wordsIndicatorModalOpen}>
          <div className={classes.paper}>
            <Typography variant="h5">Pick a word...</Typography>
            <br></br>

            {generatedRandomWords
              ? generatedRandomWords.map(
                  (word: string, i: string | number | undefined) => (
                    <input
                      key={i}
                      className={classes.inputButton}
                      type="button"
                      value={word}
                      onClick={(
                        event: React.MouseEvent<HTMLInputElement, MouseEvent>
                      ) => setSelectedWordHandler(event)}
                    />
                  )
                )
              : null}
          </div>
        </Fade>
      </Modal>
      :
    </div>
  ) : (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={wordsIndicatorModalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={wordsIndicatorModalOpen}>
          <div className={classes.paper}>
            <Typography variant="h5">
              {activePlayer} is picking a word
            </Typography>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
