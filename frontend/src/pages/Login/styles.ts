import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const ButtonContainer = styled.div`
  flex-direction: row;
`;

export const Form = styled.div`
  flex-direction: column;
  align-items: center;
  display: flex;
  > div {
    margin: 10px 0px;
    display: flex;
    flex-direction: row;
  }
`;
