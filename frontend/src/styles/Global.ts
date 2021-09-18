import { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@700&display=swap');
  
  body {
    overflow: hidden;
    background: rgb(165,1,1);
    background: linear-gradient(90deg, rgba(165,1,1,1) 0%, rgba(193,4,4,1) 8%, rgba(116,1,1,1) 81%);
  }
  #root {
    min-height: 100vh;
    min-width: 100vw;
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

    width: 150px;
    height: 50px;
  }

  input {
    margin: 0px 10px;
    border: 0.5px solid #AE0C0C;
    border-radius: 5px;
    width: 120px;
    height: 30px;
    background-color: #c4320d;
    color: #fff;

    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #fff;
      opacity: 0.7; /* Firefox */
    }

    :-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: red;
    }

    ::-ms-input-placeholder { /* Microsoft Edge */
      color: red;
    }
    :focus {
      outline: none;
     border: 0.5px solid ${darken(0.2, '#AE0C0C')};
     
    }
  }
  
`;
