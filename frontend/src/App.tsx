import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import MainProvider from './Context';
import Routes from './routes/index';
import GlobalStyle from './styles/Global';

const App: React.FC = () => (

  <Router>
    <GlobalStyle />
    <MainProvider>
      <Routes />
      <ToastContainer />

    </MainProvider>
  </Router>
);

export default App;
