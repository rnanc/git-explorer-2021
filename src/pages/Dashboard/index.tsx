import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, SearchRounded } from '@material-ui/icons';
import { CircularProgress } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Container,
  InputPesquisa,
  HeaderTitle,
  SearchContainer,
  ButtonPesquisar,
  Users,
} from './styles';
import api from '../../services/api';

interface User {
  name: string;
  login: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>(() => {
    const storageUsers = localStorage.getItem('@GithubExplorer2021::users');
    if (storageUsers) {
      return JSON.parse(storageUsers);
    }
    return [];
  });
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState<string>('');
  const alerta = (): any => toast.error('Nome não encontrado !');

  useEffect(() => {
    localStorage.setItem('@GithubExplorer2021::users', JSON.stringify(users));
  }, [users]);

  const handleAddUser = useCallback(() => {
    setLoading(true);
    api.get(`users/${login}`).then((response) => {
      setUsers([...users, response.data]);
      setLogin('');
      setLoading(false);
    }).catch(() => { alerta(); setLoading(false); setLogin(''); });
  }, [users, login]);
  return (
    <Container>
      <HeaderTitle>Git Explorer 2021</HeaderTitle>
      <SearchContainer>
        <InputPesquisa value={login} onChange={(e: React.ChangeEvent<HTMLInputElement>):void => setLogin(e.target.value)} id="outlined-basic" label="Pesquisar" variant="outlined" />
        <ButtonPesquisar onClick={handleAddUser} endIcon={!loading ? <SearchRounded /> : <CircularProgress size={25} color="inherit" />} variant="contained" color="primary">
          Pesquisar
        </ButtonPesquisar>
      </SearchContainer>
      <Users>
        {users.map((user) => (
          <Link
            key={user.name}
            to={`/${user.login}`}
          >
            <img
              src={user.avatar_url}
              alt={user.login}
            />
            <div>
              <strong>{user.name}</strong>
            </div>
            <ChevronRight />
          </Link>
        ))}
      </Users>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
};

export default Dashboard;
