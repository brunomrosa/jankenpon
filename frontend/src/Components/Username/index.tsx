import React from 'react';

import { Container } from './styles';

const Username: React.FC = () => {
  const username = '';

  const Input: React.FC = () => (
    <>
      <p>Type your username</p>
      <input name="username" id="username" type="text" />

    </>
  );

  return <Container>{username ? <h1>{username}</h1> : <Input />}</Container>;
};

export default Username;
