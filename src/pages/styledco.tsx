import React from 'react';
import styled from "styled-components";

const Styledco = () => {
  return (
    <Wrapper>
      <Header>
        <Logo src="/station.png" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Link href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </Link>
      </Header>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
`;

const Header = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Logo = styled.img`
  height: 40vmin;
`;

const Link = styled.a`
  color: #09d3ac;
`;

export default Styledco
