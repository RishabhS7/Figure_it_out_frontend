import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { useHistory,useLocation } from 'react-router-dom';
import AuthApi from '../authApi';
import Axios from 'axios';
import CanvasDraw from 'react-canvas-draw';
import ColorSlider from '../components/colorSlider';
import ChatBox from '../components/chatBox/chatBox';
import queryString from 'query-string';
import { Grid, Paper, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PointsChart from '../components/pointChart/pointChart';
import Timer from '../components/timer';
import WordsIndicatorModal from '../components/modals/wordsIndicatorModal';
import PointsIndicatorModal from '../components/modals/pointsIndicatorModal';
import RoundsIndicatorModal from '../components/modals/RoundsIndicatorModal';
import GameOverIndicatorModal from '../components/modals/GameOverIndicatorModal'
import CanvasBar from '../components/canvasBar';
import Slider from '@material-ui/core/Slider';
let socket: any; //declaring variable socket
const endPoint = 'localhost:8080';

function PlayBoard({ location }:any) {
  
  interface arrayProvider {
    id: any;
    userName: string;
    connected: boolean;
    // type:string
    // id:string
    // chatRoom:string
    // points:Number
  }
  interface canvasArray {
    connected: boolean;
    type: any;
  }
  const locations = useLocation();
  const classes = useStyles();
  const activeCanvas = useRef<any>(null);
  const history = useHistory();
  const authApi = React.useContext<any>(AuthApi);
  const [firstName, setFirstNAme] = useState<string>('');
  const [lastName, setLastNAme] = useState<string>('');
  const [number, setNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [brushColor, setBrushColor] = useState<string>('');
  const [brushRadius, setBrushRadius] = useState<number>(10);
  const [userName, setUserName] = useState<string>('');
  const [chatRoom, setChatRoom] = useState<string>('');
  const [canvasData, setCanvasData] = useState<object>();
  const [players, setPlayers] = useState<arrayProvider[]>([]);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<arrayProvider[]>([]);
  const [activePlayer, setActivePlayer] = useState<string>('');
  const [rounds, setRounds] = useState<number>(3);
  const [totalPlayers, setTotalPlayers] = useState<number>(0);
  const [time, setTime] = useState<number>(45);
  const [timeIsRunning, setTimeIsRunning] = useState<boolean>(false);
  const [selectedWord, setSelectedWord] = useState<string>('');
  const [correctAnswerByUser, setCorrectAnswerByUser] = useState<boolean>(
    false
  );
  const [wordsIndicatorModalOpen, setWordsIndicatorModalOpen] = useState<
    boolean
  >(false);
  const [pointsIndicatorModalOpen, setPointsIndicatorModalOpen] = useState<
    boolean
  >(false);
  const [roundsIndicatorModalOpen, setRoundsIndicatorModalOpen] = useState<
    boolean
  >(false);
  const [gameOverIndicatorModalOpen, setGameOverIndicatorModalOpen] = useState<
    boolean
  >(false);
  const [playerCounter, setPlayerCounter] = useState<number>(0);
  const [powerPlayer, setPowerPlayer] = useState<string>('');
  const buttonDisable = powerPlayer == userName ? false : true;
  const [guessed, setGuessed] = useState<boolean>(false);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [roundChange,setRoundChange] = useState<boolean>(false);
  if (authApi) {
    const _userId = authApi!.userId;
  }
  const [id, setId] = useState<any>(authApi!.userId);
  //  useEffect(() => {
  //     Axios.get(`/api/getSignedUser/${id}`)
  //     .then((res)=>{
  //         console.log("now the data is",res.data)
  //         setFirstNAme(res.data.firstName);
  //         setLastNAme(res.data.lastName);
  //         setNumber(res.data.number);
  //         setEmail(res.data.email)
  //     })
  //      }
  //  , [])
  //const {room,name}:queryStrings = queryString.parse(location.search)
  useEffect(() => {
    socket = io(endPoint);
    interface queryStrings {
      userName?: any;
      chatRoom?: any;
    }
    
    const { chatRoom, userName }: queryStrings = queryString.parse(
      location.search
    );
    socket = io(endPoint);

    setChatRoom(chatRoom);
    setUserName(userName);
    socket.emit('joinCanvas', { userName, chatRoom }, (error: any) => {
      if (error) {
        alert(error);
      }
    });
  //   if(locations.state){
  //     const {privateRoomDetails}:any = locations.state;
  //    if(privateRoomDetails){
  //      socket.emit('setPrivateRoomDetails',{privateRoomDetails});
  //      console.log("privateRoomDetailis are",privateRoomDetails.drawTime);
  //    }
  //  };
  }, [endPoint, location.search,locations.state]);
  
  // useEffect(() => {
  //   socket.on('setPrivateRoomDetails',({privateRoomDetails}:any)=>{
  //    console.log("we recieved the private room details",privateRoomDetails)
  //     setTime(privateRoomDetails.drawTime);
  //     setRounds(privateRoomDetails.rounds);
  // });
  // }, [])

  useEffect(() => {
    socket.on('message', (message: any) => {
      setMessages((messages) => [...messages, message]);
      console.log('socket.on message recieved');
    });
    socket.on('roomData', (Data: any) => {
      console.log('room data recievd');
      setPlayers(Data._users);
      setTotalPlayers(Data._users.length);
      if (Data._users[0]) {
        setPowerPlayer(Data._users[0].userName);
      }
    });
  }, []);

  useEffect(() => {
    socket.on('getCanvasData', (Data: any) => {
      if(Data.canvasData){
      setCanvasData(Data.canvasData);
      activeCanvas.current.loadSaveData(Data.canvasData, true);
      }
    });
  }, []);

  useEffect(() => {
    socket.on('setMyTurn', ({ userName,nextPlayer }: any) => {
      console.log("setMy turn called");
      setActivePlayer(userName);
      // setPlayerCounter(nextPlayer);
      setGuessed(false);
      setRoundChange(false);
      activeCanvas.current.clear();
      setPointsIndicatorModalOpen(true);
      setTimeout(function () {
        setPointsIndicatorModalOpen(false);
        setRoundsIndicatorModalOpen(true);
      }, 4000);
      setTimeout(function () {
        setRoundsIndicatorModalOpen(false);
        setWordsIndicatorModalOpen(true);
      }, 6000);     
    });
  }, []);

  useEffect(() => {
    interface selectedWord {
      user: string;
      _selectedWord: string;
      nextPlayer:number;
    }
    socket.on('setSelectedWord', ({ _selectedWord,nextPlayer }: selectedWord) => {
      console.log("hey set seleced word is called");
      setPlayerCounter(nextPlayer);
      setWordsIndicatorModalOpen(false);
      setSelectedWord(_selectedWord);
      setTimeIsRunning(true);
      });
  }, []);
  useEffect(() => {
    if(playerCounter===0&&roundChange==true){
    gameStartHandler();
    setRoundChange(false);
    console.log("gaemstart hadler in usestate");
    }
    else{
      console.log("round didnt change")
    }
    }
  , [roundChange]);

  useEffect(() => {
    socket.on('setRoundChange',({nextRound}:any)=>{
      console.log("we come here at setRoundChange",nextRound);
      setPlayerCounter(0);
      // let nextRound = currentRound+1;
      setCurrentRound(nextRound);
      setRoundChange(true);
       })}
  , []);

  useEffect(()=>{
    socket.on('endGame',()=>{
      setGameOverIndicatorModalOpen(true);
    })
  })

  //console.log('new canvas data',canvasData);

  // const handleLogout=(e:any)=>{
  //     e.preventDefault();

  //     console.log("works");
  //     axios({
  //         url:"/api/logout",
  //         method:"GET",

  //     }).then((res)=>{
  //         if(res.data.success==false){
  //             return console.log("not logged out");
  //         }
  //         else {
  //             authApi!.setAuth(false);
  //             // loadAnotherPage("login");
  //         }
  //     }).catch((err)=>{
  //           console.log("not logged outtt");
  //     })
  // }
  const loadAnotherPage = (page: string) => {
    switch (page) {
      case 'dashboard':
        history.push('/dashboard');
        break;
      default:
        history.push('/');
        break;
    }
  };

  const sendMessage = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (message) {
      let correctAnswerByUser = false;
      if (message == selectedWord && guessed == false) {
        // setCorrectAnswerByUser(true);
        correctAnswerByUser = true;
        setGuessed(true);
      }
      socket.emit('sendMessage', { message, correctAnswerByUser }, () =>
        setMessage('')
      );
    }
  };

  const sendCanvasDataHandler = () => {
    const canvasData = activeCanvas.current.getSaveData();
    if (canvasData && activePlayer == userName) {
      socket.emit('sendCanvasData', canvasData);
    }
  };
  const handleClear = () => {
    activeCanvas.current.clear();
    sendCanvasDataHandler();
  };
  const handleUndo = () => {
    activeCanvas.current.undo();
    sendCanvasDataHandler();
  };
  const gameStartHandler = () => {
    console.log('before currentRound', currentRound);
       if(currentRound <= rounds){
        if (playerCounter < totalPlayers ) {
          console.log(playerCounter,"this is player count");
          console.log("get my turn called");
          socket.emit('getMyTurn', (players[playerCounter].userName));
          return;
        }
        else if(playerCounter==totalPlayers){
          console.log("hey players are over");
          socket.emit('setRoundChange',currentRound);
          return;
        }
      }
      socket.emit('endGame');
  };
  const gameQuitHandler = () => {
    socket.emit('disconnected');
    loadAnotherPage('dashboard');
  };

  const setSelectedWordHandler = (event: any) => {
    socket.emit('setSelectedWord', event.target.value,playerCounter+1);
  };
  const activateEraserHandler = () => {
    setBrushColor('white');
  };
  const activatePencilHandler = () => {
    setBrushColor('black');
  };
  const handleBrushSizeChange = (event: any, newValue: any) => {
    setBrushRadius(newValue);
  };
   
  return (
    <div>
      <Grid item xs container direction="row" spacing={1}>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item>
            <PointsChart players={players} />
          </Grid>
          <Grid
            item
            container
            direction="row"
            className={classes.grid1}
            spacing={1}
          >
            <Grid item xs>
              <Button
                className={classes.startButton}
                variant="contained"
                color="secondary"
                disabled={buttonDisable}
                onClick={()=>{setRoundChange(true)}}
              >
                Start
              </Button>
            </Grid>
            <Grid item xs>
              <Timer
                time={time}
                setTime={setTime}
                timeIsRunning={timeIsRunning}
                setTimeIsRunning={setTimeIsRunning}
                setPointsIndicatorModalOpen={setPointsIndicatorModalOpen}
                gameStartHandler={gameStartHandler}
                buttonDisable={buttonDisable}
                activePlayer = {activePlayer}
                userName = {userName}
              />
            </Grid>
            <Grid item xs>
              <Button
                className={classes.quitButton}
                variant="contained"
                onClick={gameQuitHandler}
              >
                Quit
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item container xs spacing={1}>
          <Grid item xs>
            <CanvasBar
              userName={userName}
              activePlayer={activePlayer}
              selectedWord={selectedWord}
            />
          </Grid>
          <Grid item xs>
            <Paper elevation={3} className={classes.canvasPaper}>
              <CanvasDraw
                ref={activeCanvas}
                canvasWidth={800}
                canvasHeight={480}
                immediateLoading={true}
                hideGrid={true}
                onChange={sendCanvasDataHandler}
                brushColor={brushColor}
                brushRadius={brushRadius}
              />
            </Paper>
          </Grid>

          <Grid item container direction="row" spacing={2}>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleClear}>
                Clear
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={handleUndo}>
                Undo
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={activatePencilHandler}
              >
                <i className="fas fa-pen"></i>
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={activateEraserHandler}
                className={classes.eraserButton}
              >
                Eraser
              </Button>
            </Grid>
            <Grid item xs>
              <Slider
                value={brushRadius}
                onChange={handleBrushSizeChange}
                aria-labelledby="continuous-slider"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs container direction="column" spacing={1}>
          <Grid item container direction="row">
            <Grid item xs>
              <Paper className={classes.rulesStyles}>
               <Typography variant="h6"> Round {currentRound} of {rounds}</Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs>
            <ChatBox
              userName={userName}
              chatRoom={chatRoom}
              message={message}
              setMessage={setMessage}
              messages={messages}
              setMessages={setMessages}
              sendMessage={sendMessage}
              selectedWord={selectedWord}
            />
          </Grid>
        </Grid>

        <WordsIndicatorModal
          wordsIndicatorModalOpen={wordsIndicatorModalOpen}
          setWordsIndicatorModalOpen={setWordsIndicatorModalOpen}
          setSelectedWordHandler={setSelectedWordHandler}
          userName={userName}
          activePlayer={activePlayer}
        />
        <PointsIndicatorModal
          pointsIndicatorModalOpen={pointsIndicatorModalOpen}
          setPointsIndicatorModalOpen={setPointsIndicatorModalOpen}
          players={players}
        />
        <GameOverIndicatorModal
          gameOverIndicatorModalOpen={gameOverIndicatorModalOpen}
          setGameOverIndicatorModalOpen={setGameOverIndicatorModalOpen}
          players={players}
        />
        <RoundsIndicatorModal
          currentRound={currentRound} 
          roundsIndicatorModalOpen={roundsIndicatorModalOpen}
        />
      </Grid>

      {/* <ColorSlider/> */}
    </div>
  );
}

export default PlayBoard;

const useStyles = makeStyles((theme) => ({
  canvasPaper: {
    width: '801',
    height: '501',
  },
  grid1: {
    height: '10%',
  },
  startButton: {
    borderRadius: '35% 0px 0px 35%',
    width: '137px',
    height: '55px',
  },
  rulesStyles: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.light,
    padding: '3.4%',
  },
  quitButton: {
    backgroundColor: theme.palette.secondary.light,
    color: 'white',
    borderRadius: '0px 35% 35% 0px',
    width: '137px',
    height: '55px',
    '&:hover, &:focus': {
      backgroundColor: '#8B0000',
    },
  },
  eraserButton: {
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: theme.palette.primary,
    },
  },
}));
