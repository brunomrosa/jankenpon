import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import Main from './Main';
import GlobalStyle from './styles/Global';

const App: React.FC = () => (
  <>
    <Main />
    <GlobalStyle />
    <ToastContainer />
  </>
);

ReactDOM.render(<App />, document.getElementById('root'));
