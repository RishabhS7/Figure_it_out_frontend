import React, { useState } from 'react';
import { TextField, Button, Grid, Box } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import AuthApi from '../authApi';
import { Link, useHistory } from 'react-router-dom';
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

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const authApi = React.useContext<any>(AuthApi);

  const [snackOpen, setSnackOpen] = useState<boolean>(false);
  const [snackMsg, setSnackMsg] = useState<string>('');
  const [severity, setSeverity] = useState<string>('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const formObj = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    // let { email, password } = event.currentTarget.elements;
    console.log(formObj.email, formObj.password);
    axios
      .post('/api/login', formObj)
      .then((res) => {
        console.log(res.data.message);
        if (res.data.success == true) {
          setSeverity('success');
          setSnackMsg('Login Successfull');
          setSnackOpen(true);
          authApi!.setAuth(true);
          authApi.setUserId(res.data.id);
          //console.log(authApi!.auth);

          // loadAnotherPage('dashboard');
          console.log('login successful', authApi.userId, authApi.auth);
          // e.form.reset();
        }
      })
      .catch((res: any) => {
        console.log(res.data);
        setSeverity('error');
        setSnackMsg('Please Enter Valid Input Details');
        setSnackOpen(true);

        console.log('data is not sent to the serer');
      });
  };
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

  return (
    <div>
      <form
        className={classes.form}
        onSubmit={(event: React.FormEvent<HTMLFormElement>): void => {
          handleSubmit(event);
        }}
      >
        <TextField
          type="email"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          placeholder="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link to="/registration">
              <p className="pTags">Register now..</p>
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

export default Login;
