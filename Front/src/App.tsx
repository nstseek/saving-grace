import { Card, CardContent } from '@material-ui/core';
import React from 'react';
import './App.scss';
import Header from './shared/components/header/Header';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

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

      </ThemeProvider>
      {/* <Card>
        <CardContent>Saving Grace app working!</CardContent>
      </Card> */}
    </div>
  );
}

export default App;
