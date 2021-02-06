import React, { useState,useEffect ,useRef} from 'react';
import {
  TextField,
  Button,
  Grid,
  Box,
  InputLabel,
  Paper,
  Select,
  Chip,
  Typography
} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import MenuItem from '@material-ui/core/MenuItem';
import { Link, Redirect, Route, useHistory,NavLink } from 'react-router-dom';
import { AnyARecord } from 'dns';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  menuItems: {
    width: '100%',
  },
  paperStyles: {
    marginTop: '5%',
    marginLeft: '5%',
    padding: '2%',
    width: '30%',
  },
  chip: {
    display:'flex',
    flexDirection:'row'
  },
  items:{
    display:'flex',
  flexDirection:'row'
  },
  customWordsPaper:{
    minHeight:'100px',
    maxHeight:'100px'
  },
  scrollDiv:{
    overflow:'auto'
  }
}));

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function PrivateRoom({location}:any) {
  const classes = useStyles();
  const [rounds, setRounds] = useState<number>(3);
  const [drawTime, setDrawTime] = useState<number>(60);
  const [snackOpen, setSnackOpen] = useState<boolean>(false);
  const [snackMsg, setSnackMsg] = useState<string>('');
  const [severity, setSeverity] = useState<string>('');
  const[roomDetails,setRoomDetails] = useState<boolean>(false);
  let[chatRoom,setChatRoom] = useState<string>();
  let[userName,setUserName] = useState<string>();
  let history = useHistory();
  const checkLowerCase = new RegExp('^(?=.*[a-z])(?=.{1,})');
  const checkUpperCase = new RegExp('^(?=.*[A-Z])(?=.{1,})');
  const checkContainsNumber = new RegExp('^(?=.*[0-9])(?=.{1,})');
  const checkChaaracter = new RegExp('^(?=.*[!@#$%^&*])(?=.{1,})');
  const checkEightCharacters = new RegExp('^(?=.{8,})');
  const checknameCharacters = new RegExp('^(?=.{3,})');
  const checkpasswordCharacters = new RegExp('^(?=.{7,})');
  const checkEmailCharacters = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const checkNameChaaracter = new RegExp('^(?=.*[a-zA-Z\\s])(?=.{1,})');
  const [word, setword] = useState<string>('')
  const [customWords, setCustomWords] = useState([
    'hello','new','again'
  ]);
  const copyValue2 = useRef<any>(null);
  
  const handleDelete = (customWordToDelete:any) => () => {
    setCustomWords((customWords) => customWords.filter((word) => word !== customWordToDelete));
  };
  
  useEffect (()=>{
    interface queryStrings {
    userName?: any;
    chatRoom?: any;
  }
  const { chatRoom, userName }: queryStrings = queryString.parse(
    location.search
  );
  setChatRoom(chatRoom);
  setUserName(userName);
},[])
  const addWordsHandler=(event:any)=>{
    event.preventDefault();
    console.log(event.target.value)
    setCustomWords((customWords) => [...customWords, word]);
    setword('');
  }
  const handleRoundsChange = (event:any) => {
    setRounds(event.target.value);
    console.log('roundsChanged');
  };
  const handleDrawTimeChange = (event:any) => {
    setDrawTime(event.target.value)
    console.log('time changed',event.target.value);
  };
  const handleRoomSubmit=(event:any)=>{
    event.preventDefault();
    const privateRoomDetails= {
      rounds:rounds,
      drawTime:drawTime,
    }
    console.log(privateRoomDetails);
    history.push(`/PlayBoard?chatRoom=${chatRoom}&userName=${userName}`,{privateRoomDetails});
  }
  // function changePage() {
  //   history.push("/playBoard",{privateRoomDetails});
  // }
  const copyAddress=(copyValue:any)=>{
    copyValue.current.select();
    // var refInput=event.target.value[0];
    // refInput.select();
    document.execCommand("copy");
  }
  return (
    <div>
      <Paper elevation={3} className={classes.paperStyles}>
        <form
          className={classes.form}
          
        >
        <Grid xs container direction = "column" spacing = {2}>
         <Grid xs item >
          <InputLabel id="demo-simple-select-label">Rounds</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={rounds}
            name="rounds"
            defaultValue={rounds}
            onChange={(event)=>handleRoundsChange(event)}
            className={classes.menuItems}
          >
            <MenuItem value={1}>One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
            <MenuItem value={4}>Four</MenuItem>
            <MenuItem value={5}>Five</MenuItem>
            <MenuItem value={6}>Six</MenuItem>
            <MenuItem value={7}>Seven</MenuItem>
          </Select>
          </Grid> 
          <Grid xs item >
          <InputLabel id="demo-simple-select-label">Draw Time</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={drawTime}
            name = 'drawTime'
            defaultValue={drawTime}
            onChange={(event)=>handleDrawTimeChange(event)}
            className={classes.menuItems}
          >
            <MenuItem value={60}>60</MenuItem>
            <MenuItem value={70}>70</MenuItem>
            <MenuItem value={80}>80</MenuItem>
            <MenuItem value={90}>90</MenuItem>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={120}>120</MenuItem>
            <MenuItem value={150}>150</MenuItem>
            <MenuItem value={180}>180</MenuItem>
          </Select>
          </Grid>
          <Grid xs item >
          {/* <InputLabel id="demo-simple-select-label">Custom Words</InputLabel> */}
          <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          name="customWords"
          label="Custom Words"
          type="text"
          placeholder="Custom words"
          value={word}
          onChange={(event)=>setword(event.target.value)}
          onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) =>
            event.key == 'Enter' ? addWordsHandler(event) : null
          }
        /></Grid>
         <Paper  elevation={2} className={classes.customWordsPaper} >
         <div id="out" className={classes.scrollDiv}>
          <Grid item container direction = 'row'>
          
           
           {customWords.map((customWord,i) => 
                <div key={i} className={classes.items}>
                       <Chip
                          label={customWord}
                          onDelete={handleDelete(customWord)}
                          className={classes.chip}
                         />
                 </div>
                
              )}
              
              </Grid>
              </div>
              </Paper>

          {!roomDetails ? (
            <div>
          <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}  
              onClick = {()=>setRoomDetails(true)}
            >
              Play Now
            </Button>    
            </div>
          ):(<div>
            
              {' '}
              <Button
                type="button"
                fullWidth
                variant="contained"
                color="primary"
                onClick = {handleRoomSubmit}
              >
                Join
              </Button>
            {/* <button onClick={copyCodeToClipboard}>Click</button> */}
            <p>Share this link to get other players</p>
            <input type = "text" value = {`http://localhost:3000/?chatRoom=${chatRoom}`} onClick={()=>{copyAddress(copyValue2)}} ref = {copyValue2}></input>
          </div>)}
          <Grid container>
            <Grid item xs>
              <Link to="/dashBoard">Play Online</Link>
            </Grid>
          </Grid>
          <Box mt={5}></Box>
          </Grid>
        </form>
      </Paper>
      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
      >
        <Alert onClose={() => setSnackOpen(false)} severity={severity}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default PrivateRoom;