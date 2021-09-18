import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ButtonContainer = styled.div`
  flex-direction: row;
`;

export const Loader = styled.div`
 border: 10px solid rgba(116,1,1,1); /* Light grey */
  border-top: 10px solid rgba(160,50,20,1); /* Blue */
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 0.5s linear infinite;

  @keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;
