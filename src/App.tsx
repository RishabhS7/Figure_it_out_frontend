import React, { useState, useEffect, SFC, useContext } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './pages/login';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  RouteProps,
} from 'react-router-dom';
import Registeration from './pages/registeration';
import Dashboard from './pages/dashboard';
import AuthApi from './authApi';
import Axios from 'axios';
import PrivateRoom from './pages/privateRoom';
import PlayBoard from './pages/playBoard';
import ChatBox from './components/chatBox/chatBox';

function App(): JSX.Element {
  // const authApi = React.useContext(AuthApi);
  const [auth, setAuth] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>('');
  useEffect(() => {
    Axios.get('/api/sessionAssigned').then((res) => {
      if (res.data.success) {
        setAuth(true);

        setUserId(res.data.id);
        console.log('session assigned ', userId, auth);
      } else {
        console.log('not assigned ', userId, auth);
      }
    });
  }, []);
  type Props = {
    auth: boolean;
    setAuth: (active: boolean) => void;
    userId: string;
    setUserId: (active: string) => void;
    // isActive: boolean;
    // setIsActive: (active: boolean) => void;
  };
  return (
    <div>
      <AuthApi.Provider value={{ auth, setAuth, userId, setUserId }}>
        <Router>
          <Switch>
            <RouteRegistration exact path="/login" component={Login} />
            <RouteRegistration
              path="/registration"
              exact
              component={Registeration}
            />
            {/* <RouteProtected path ="/dashboard"  exact component = {Dashboard}/> */}
            {/* <RouteProtected path ="/createPrivateRoom"  exact component = {PrivateRoom}/> */}
            {/* <RouteProtected path ="/playBoard"  exact component = {PlayBoard}/> */}
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/createPrivateRoom" exact component={PrivateRoom} />
            <Route path="/chatBox" exact component={ChatBox} />
            <Route path="/playBoard" exact component={PlayBoard} />
            <Route path="*" component={Dashboard} />
          </Switch>
        </Router>
      </AuthApi.Provider>
    </div>
  );
}

// interface Prop{
//     exact :boolean;
//     path:string;
//     component: FunctionComponent

// } & RouteComponentProps;

interface IPrivateRouteProps extends RouteProps {
  component: any;
}

const RouteRegistration: SFC<IPrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const authApi = useContext(AuthApi);
  if (!authApi.auth) {
    return <Component {...rest} />;
  } else {
    return <Redirect to="/dashboard" />;
  }
};
const RouteProtected: SFC<IPrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const authApi = useContext(AuthApi);
  if (authApi.auth) {
    return <Component {...rest} />;
  } else {
    return <Redirect to="/login" />;
  }
};
export default App;
