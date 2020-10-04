import { Card, CardContent } from '@material-ui/core';
import React from 'react';
import './App.scss';
import Header from './shared/components/header/Header';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CarouselMobile from './shared/components/carousel-mobile/CarouselMobile';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Routes } from './routes';
import Home from './pages/home/Home';
import Empresa from './pages/empresa/Empresa';

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

function App() {
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <Header />
        <BrowserRouter>
            <Switch>
              <Route path={Routes.Home} component={Home} exact={true} />
              <Route path={Routes.Empresa} component={Empresa} />
              {/* {this.props.isLogged ? <Route path={Routes.Calendario} component={Calendario} /> : null} */}
              {/* <Redirect path="/" to={this.props.isLogged ? Routes.Calendario : Routes.Login} /> */}
            </Switch>
          </BrowserRouter>
      </ThemeProvider>
      {/* <Card>
        <CardContent>Saving Grace app working!</CardContent>
      </Card> */}
    </div>
  );
}

export default App;
