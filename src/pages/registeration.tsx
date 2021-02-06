import React, { useState } from 'react';
import { TextField, Button, Grid, Link, Box } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    border: '1px solid black',
    background: 'linear-gradient(to top right,#C32AFF,#54007A)',
    paddingTop: '20vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginLeft: '30%',
    width: '35%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Registeration() {
  const classes = useStyles();
  const [errFirstName, setErrFirstName] = useState<boolean>(false);
  const [firstNameHelperText, setFirstNameHelperText] = useState<string>('');
  const [errLastName, setErrLastName] = useState<boolean>(false);
  const [lastNameHelperText, setLastNameHelperText] = useState<string>('');
  const [errEmail, setErrEmail] = useState<boolean>(false);
  const [emailHelperText, setEmailHelperText] = useState<string>('');
  const [errNumber, setErrNumber] = useState<boolean>(false);
  const [numberHelperText, setNumberHelperText] = useState<string>('');
  const [passwordHelperText, setPasswordHelperText] = useState<string>('');
  const [errPassword, setErrPassword] = useState<boolean>(false);
  const [conPasswordHelperText, setConPasswordHelperText] = useState<string>(
    ''
  );
  const [errConPassword, setErrConPassword] = useState<boolean>(false);
  const [inputPassword, setInputPassword] = useState<string>('');
  const [snackOpen, setSnackOpen] = useState<boolean>(false);
  const [snackMsg, setSnackMsg] = useState<string>('');
  const [severity, setSeverity] = useState<string>('');

  const checkLowerCase = new RegExp('^(?=.*[a-z])(?=.{1,})');
  const checkUpperCase = new RegExp('^(?=.*[A-Z])(?=.{1,})');
  const checkContainsNumber = new RegExp('^(?=.*[0-9])(?=.{1,})');
  const checkChaaracter = new RegExp('^(?=.*[!@#$%^&*])(?=.{1,})');
  const checkEightCharacters = new RegExp('^(?=.{8,})');
  const checknameCharacters = new RegExp('^(?=.{3,})');
  const checkpasswordCharacters = new RegExp('^(?=.{7,})');
  const checkEmailCharacters = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const checkNameChaaracter = new RegExp('^(?=.*[a-zA-Z\\s])(?=.{1,})');

  const firstNameChangeHandler = (event: any) => {
    console.log(event.target.value);
    const inputFirstName: string = event.target.value;
    if (!checknameCharacters.test(inputFirstName)) {
      setErrFirstName(true);
      setFirstNameHelperText('First Name length can not be less tham 3');
    } else {
      setErrFirstName(false);
      setFirstNameHelperText('');
    }
  };
  const lastNameChangeHandler = (event: any) => {
    const inputLastName: string = event.target.value;
    if (!checknameCharacters.test(inputLastName)) {
      setErrLastName(true);
      setLastNameHelperText('Last Name length can not be less tham 3');
    } else {
      setErrLastName(false);
      setLastNameHelperText('');
    }
  };
  const emailChangeHandler = (event: any) => {
    const inputEmail: string = event.target.value;
    if (!checkEmailCharacters.test(inputEmail)) {
      setErrEmail(true);
      setEmailHelperText('Input valid Email Address');
    } else {
      setErrEmail(false);
      setEmailHelperText('');
    }
  };
  const numberChangeHandler = (event: any) => {
    const inputNumber = event.target.value;
    if (!checkEightCharacters.test(inputNumber)) {
      setErrNumber(true);
      setNumberHelperText('Number Should have 8 digits');
    } else {
      setErrNumber(false);
      setNumberHelperText('');
    }
  };
  const passwordChangeHandler = (event: any) => {
    setInputPassword(event.target.value);
    const inputPassword: string = event.target.value;
    if (!checkUpperCase.test(inputPassword)) {
      setErrPassword(true);
      setPasswordHelperText('password should have an uppercase letter');
    } else if (!checkpasswordCharacters.test(inputPassword)) {
      setErrPassword(true);
      setPasswordHelperText('password should have 7 characters');
    } else if (!checkContainsNumber.test(inputPassword)) {
      setErrPassword(true);
      setPasswordHelperText('password should contain a number');
    } else {
      setErrPassword(false);
      setPasswordHelperText('');
    }
  };
  const confirmPasswordChangeHandler = (event: any) => {
    const inputConfirmPassword: string = event.target.value;
    if (inputPassword != inputConfirmPassword) {
      setErrConPassword(true);
      setConPasswordHelperText("Password didm't match");
    } else {
      setErrConPassword(false);
      setConPasswordHelperText('');
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formObj = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      number: event.target.number.value,
      password: event.target.password.value,
    };

    // let { email, password } = event.currentTarget.elements;

    if (errFirstName || errEmail || errPassword || errConPassword == true) {
      setSeverity('error');
      setSnackMsg('Please enter valid fields');
      setSnackOpen(true);
    } else {
      axios
        .post('/api/register', formObj)
        .then((res: any) => {
          if (res.data.success == true) {
            console.log('Data is been sent');
            setSnackMsg('User registered succesfully');
            setSeverity('success');
            setSnackOpen(true);
            // loadAnotherPage("login")
          }
        })
        .catch((err: Error) => {
          console.log('my success');
          console.log('data is not sent to the serer');
        });
    }

    // axios
    //   .post(`${RootURL}/auth`, {
    //     email: email.value,
    //     password: password.value
    //   })
    //   .then(res => {
    //     let decoded = jwt_decode(res.data);
    //     sessionStorage.setItem("empid", JSON.stringify(decoded));
    //     sessionStorage.setItem("token", res.data);
    //     setEmpid(decoded);
    //   })
    //   .catch(err => {
    //     setSnackOpen(true);
    //     console.log(err.response);
    //   });
    // };
  };
  return (
    <div>
      <form
        className={classes.form}
        onSubmit={(event: React.FormEvent<HTMLFormElement>): void => {
          handleSubmit(event);
        }}
      >
        <TextField
          error={errFirstName}
          type="text"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          autoComplete="name"
          helperText={firstNameHelperText}
          autoFocus
          onChange={(event) => firstNameChangeHandler(event)}
        />
        <TextField
          error={errLastName}
          type="text"
          variant="outlined"
          margin="normal"
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="name"
          helperText={lastNameHelperText}
          autoFocus
          onChange={(event) => lastNameChangeHandler(event)}
        />
        <TextField
          error={errEmail}
          type="email"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          helperText={emailHelperText}
          autoFocus
          onChange={(event) => emailChangeHandler(event)}
        />
        <TextField
          error={errNumber}
          type="number"
          variant="outlined"
          margin="normal"
          fullWidth
          id="number"
          label="Number"
          name="number"
          autoComplete="number"
          helperText={numberHelperText}
          autoFocus
          onChange={(event) => numberChangeHandler(event)}
        />
        <TextField
          error={errPassword}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          placeholder="password"
          helperText={passwordHelperText}
          onMouseOver={() => {
            setPasswordHelperText(
              'Password should contain an uppercase letter,a digit and atleast 7 characters'
            );
          }}
          onMouseDown={(event) => setPasswordHelperText('')}
          onMouseLeave={(event) => setPasswordHelperText('')}
          autoComplete="current-password"
          onChange={(event) => {
            passwordChangeHandler(event);
          }}
        />
        <TextField
          error={errConPassword}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          placeholder="Confirm password"
          helperText={conPasswordHelperText}
          // onMouseLeave ={(event)=>confirmPasswordChangeHandler(event)}
          onChange={(event) => confirmPasswordChangeHandler(event)}
          autoComplete="current-password"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign up
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="/registeration" variant="body2">
              back to login
            </Link>
          </Grid>
        </Grid>
        <Box mt={5}></Box>
      </form>
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

export default Registeration;
