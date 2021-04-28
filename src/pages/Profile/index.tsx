import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Star,
  ChevronLeft,
  ChevronRight,
} from '@material-ui/icons';
import { CircularProgress } from '@material-ui/core';
import {
  Container,
  Avatar,
  HeaderContainer,
  HeaderItems,
  Repos,
} from './styles';
import api from '../../services/api';

interface RepositoryParams {
  user: string;
}

interface UserRepos {
  name: string;
  description: string;
  html_url: string
  owner: {
    avatar_url: string;
    login: string;
  }

}
const Profile: React.FC = () => {
  const [userRepos, setUserRepos] = useState<UserRepos[]>();
  const { params } = useRouteMatch<RepositoryParams>();
  const [loading, setLoading] = useState(true);
  const alerta = (msg: string): any => toast.error(msg);
  const history = useHistory();

  useEffect(() => {
    api.get(`/users/${params.user}/repos`).then((response) => {
      setUserRepos(response.data);
      setLoading(false);
    }).catch(() => { alerta('Usuário não encontrado, em instantes você será redirecionado para página inicial.'); setTimeout(() => { history.push('/'); }, 5000); });
  }, [params.user]);
  return (
    <Container>
      {loading
        ? <CircularProgress size={75} />
        : userRepos && userRepos.length > 0
          ? (
            <>
              <Link to="/">
                <ChevronLeft fontSize="large" />
              </Link>
              <Avatar src={userRepos[0].owner.avatar_url} />
              <HeaderContainer>
                <HeaderItems>
                  <Link to={`/${params.user}/starred`}>
                    Repositórios Favoritos
                    <Star color="secondary" />
                  </Link>
                </HeaderItems>
                <HeaderItems>
                  <h3>
                    User:
                    {' '}
                    {userRepos[0].owner.login}
                  </h3>
                </HeaderItems>
              </HeaderContainer>
              <Repos>
                {userRepos.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.html_url}
                  >
                    <div>
                      <strong>{repo.name}</strong>
                      <h3>{repo.description}</h3>
                    </div>
                    <ChevronRight />
                  </a>
                ))}
              </Repos>
            </>
          )
          : (
            <>
              <Link to="/">
                <ChevronLeft fontSize="large" />
              </Link>
              <h1>Não foi encontrado repositórios públicos para esta conta</h1>
            </>
          )}
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

export default Profile;
