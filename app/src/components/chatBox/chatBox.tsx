import React from 'react';
import InfoBar from './infoBar';
import Messages from './messages';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, Paper } from '@material-ui/core';
interface props {
  userName: string;
  chatRoom: string;
  message: string;
  messages: any;
  setMessage: any;
  setMessages: any;
  sendMessage: any;
  selectedWord: string;
}
const ChatBox = ({
  userName,
  chatRoom,
  message,
  messages,
  setMessage,
  setMessages,
  sendMessage,
  selectedWord,
}: props) => {
  const classes = useStyles();

  return (
    <Paper elevation={3} className={classes.paperStyles}>
      <InfoBar chatRoom={chatRoom} />
      <Grid container xs>
        <Messages
          messages={messages}
          userName={userName}
          selectedWord={selectedWord}
        />

        <form>
          <Grid item container xs direction="row">
            <Grid item xs>
              <TextField
                required
                className={classes.textfield}
                type="text"
                placeholder="type a message"
                value={message}
                onChange={({ target: { value } }) => setMessage(value)}
                onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
                  event.key == 'Enter' ? sendMessage(event) : null
                }
              />
            </Grid>
            <Grid item xs>
              <Button
                color="primary"
                variant="contained"
                onClick={(
                  event: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => sendMessage(event)}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Paper>
  );
};

export default ChatBox;

const useStyles = makeStyles(theme => ({
  paperStyles: {
    minHeight: '475px',
    maxHeight: '475px',
    padding: '1%',
  },
  gridStyles: {},
  textfield: {
    width: '230px',
    marginRight: '25px',
  },
}));
