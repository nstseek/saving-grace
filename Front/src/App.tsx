import { Card, CardContent } from '@material-ui/core';
import React, { useEffect } from 'react';
import './App.scss';
import Header from './shared/components/header/Header';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CarouselMobile from './shared/components/carousel-mobile/CarouselMobile';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from './routes';
import Home from './pages/home/Home';
import Empresa from './pages/empresa/Empresa';
import Apoiando from './pages/apoiando/Apoiando';
import Signup from './pages/signup/signup';
import Loading from './shared/components/loading/Loading';
import { useState } from 'react';
import { connect } from 'react-redux';
import { AppState } from './configureStore';
import { LoadingState } from './stores/system';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#8003C8',
    },
    secondary: {
      main: '#34ca96',
    },
  },
});

export const loadConfig = {
  open: false
};

const App = (props) => {

  const [loading, setLoading] = useState(loadConfig.open);
    useEffect(() => {
        setLoading(loadConfig.open)
    }, [loadConfig.open]);

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Header />
        <BrowserRouter>
            <Switch>
              <Route path={Routes.Home} component={Home} exact={true} />
              <Route path={Routes.Empresa} component={Empresa} />
              <Route path={Routes.Apoiando} component={Apoiando} />
              <Route path={Routes.SignUp} component={Signup} />
              {/* {this.props.isLogged ? <Route path={Routes.Calendario} component={Calendario} /> : null} */}
              <Redirect path="/" to={Routes.Home} />
            </Switch>
          </BrowserRouter>
          <Loading open={props.system.loading === LoadingState.Loading}/>
      </ThemeProvider>
      {/* <Card>
        <CardContent>Saving Grace app working!</CardContent>
      </Card> */}
    </div>
  );
}

const mapStateToProps = ({system}: AppState) => ({
  system
})

export default connect(mapStateToProps)(App);
