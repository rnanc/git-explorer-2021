import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  a {
    align-self: flex-start;
    text-decoration: none;
    transition: transform 0.6s;
    color: #a8a8b3;
    &:hover {
      color: #000
    }
  }
`;

export const Avatar = styled.img`
  border-radius: 100%;
  height: 164px;
  width: 164px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;


`;

export const HeaderItems = styled.div`
    margin-top: 32px;
  a {
    color: #a8a8b3;
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: transform 0.4s;
    &:hover {
      transform: translateY(-10px);
    }
  }
  svg {
    margin-left: 8px !important;
  }
  h3 {
    text-align: center;
    background: #fff;
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    color: #a8a8b3;
    margin-left: 16px !important;
  }
`;

export const Repos = styled.div`
  margin-top: 80px;
  max-width: 700px;
  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }
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
