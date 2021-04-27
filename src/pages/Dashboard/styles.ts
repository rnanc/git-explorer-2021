import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HeaderTitle = styled.h1`
  flex: 1;
  max-width: 45%;
  font-size: 64px;
  margin-bottom: 35px;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const InputPesquisa = styled(TextField)`
  flex: 1;
  max-width: 50%;
`;

export const ButtonPesquisar = styled(Button)`
  margin-left: 16px !important;
`;

export const Users = styled.div`
  margin-top: 80px;
  max-width: 700px;
  a {
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: transform 0.4s;
    &:hover {
      transform: translate(10px);
    }
    & + a {
      margin-top: 16px;
    }
  }
  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }
  div {
    margin: 0 16px;
    flex: 1;
    strong {
      font-size: 20px;
      color: #3d3d4d;
    }
    p {
      font-size: 18px;
      color: #a8a8b3;
      margin-top: 4px;
    }
  }
  svg {
    margin-left: auto;
    color: #cbcbd6;
  }
`;
