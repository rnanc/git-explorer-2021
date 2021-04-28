import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
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

  useEffect(() => {
    api.get(`/users/${params.user}/repos`).then((response) => {
      setUserRepos(response.data);
      setLoading(false);
    });
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
    </Container>
  );
};

export default Profile;
