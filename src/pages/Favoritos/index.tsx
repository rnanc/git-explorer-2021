import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
} from '@material-ui/icons';
import { CircularProgress } from '@material-ui/core';
import {
  Container,
  HeaderContainer,
  HeaderItems,
  Repos,
} from './styles';
import api from '../../services/api';

interface RepositoryParams {
  login: string;
}

interface UserFav {
  name: string;
  description: string;
  html_url: string
  owner: {
    login: string;
    avatar_url: string;
  }
}
const Favoritos: React.FC = () => {
  const [userFav, setUserFav] = useState<UserFav[]>();
  const { params } = useRouteMatch<RepositoryParams>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/users/${params.login}/starred`).then((response) => {
      setUserFav(response.data);
      setLoading(false);
    });
  }, [params.login]);
  return (
    <Container>
      {loading
        ? <CircularProgress size={75} />
        : userFav && userFav.length > 0
          ? (
            <>
              <Link to="/">
                <ChevronLeft fontSize="large" />
              </Link>
              <HeaderContainer>
                <HeaderItems>
                  <h3>
                    User:
                    {' '}
                    {params.login}
                  </h3>
                </HeaderItems>
              </HeaderContainer>
              <Repos>
                {userFav.map((repo) => (
                  <a
                    key={repo.name}
                    href={repo.html_url}
                  >
                    <img
                      src={repo.owner.avatar_url}
                      alt={repo.owner.login}
                    />
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
              <h1>Não foi encontrado repositórios favoritados para esta conta</h1>
            </>
          )}
    </Container>
  );
};

export default Favoritos;
