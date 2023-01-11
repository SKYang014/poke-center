import React from 'react';
import ThoughtList from '../components/ThoughtList';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries'
import { useParams } from 'react-router-dom';
import FriendList from '../components/FriendList'
import PokemonList from '../components/PokemonList';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { username: userParam }
  });

  const user = data?.user || {}
  console.log(data)
  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {user.username}'s Profile
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-4">
          <PokemonList pokemon={user.currentTeam}
            title={`${user.username}'s Current Team:`} />
        </div>
        <div className="col-12 mb-3 col-lg-5">
          <ThoughtList thoughts={user.thoughts}
            title={`${user.username}'s thoughts...`} />
        </div>
        <div className="col-12 col-lg-2 mb-3">
          <FriendList
            friends={user.friends}
            username={user.username}
            friendCount={user.friendCount} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
