import React from 'react'
import ReactDOM from 'react-dom'
import Main from './Main'
import GlobalStyle from './styles/global'
import {ToastContainer} from 'react-toastify'
function App() {
  return (
    <>
      <Main />
      <GlobalStyle />
      <ToastContainer />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
