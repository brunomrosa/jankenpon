import {createGlobalStyle} from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'
export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');
  
  body {
    overflow: hidden;
    background: rgb(165,1,1);
    background: linear-gradient(90deg, rgba(165,1,1,1) 0%, rgba(193,4,4,1) 8%, rgba(116,1,1,1) 81%);
  }

  h1,h2,div {
    font-family: 'Roboto', sans-serif;
  }

  h1 {
    color: #ffebe6;
  }

  .card{
    background: #fff;
    box-shadow: 0 0 10px 0 rgba(183, 192, 206, 0.2);
    padding: 24px;
    margin-bottom: 24px;
  }

  button {
    background-color: #c4320d;
    border: none;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
  }

  input {
    margin: 0px 10px;
    border: none;
    border-radius: 5px;
    width: 100px;
    height: 20px;
  }
`
