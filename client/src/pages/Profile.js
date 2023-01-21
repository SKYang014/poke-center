import React from 'react';
import ThoughtList from '../components/ThoughtList';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries'
import { ADD_FRIEND, REMOVE_POKEMON } from '../utils/mutations';
import { useParams, Navigate, Link } from 'react-router-dom';
import FriendList from '../components/FriendList'
import PokemonList from '../components/PokemonList';
import ThoughtForm from '../components/ThoughtForm';
import Auth from '../utils/auth';

const Profile = () => {
  const [addFriend] = useMutation(ADD_FRIEND)
  const [removePokemon] = useMutation(REMOVE_POKEMON)
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });


  const user = data?.me || data?.user || {}

  // console.log(data)
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/profile" />
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page!
      </h4>
    )
  }
  const handleClick = async () => {
    try {
      console.log(user._id)
      await addFriend({
        variables: { id: user._id }
      });
    } catch (e) {
      console.log(e)
    }
  }
  const loggedIn = Auth.loggedIn();

  const handleRemove = async (pokeId) => {
    try {
      await removePokemon({
        variables: { pokemonId: pokeId }
      })
    }
    catch (e) {
      console.log(e)
    }
  }


  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : 'your'} Profile
        </h2>
        {
          userParam !== user.username ?
            (
              <Link to={`/addpokemon/${user.username}`}>
                <h3>Manage Team</h3>
              </Link>

            )
            :
            ""
        }
        {userParam &&
          <button className='btn ml-auto' onClick={handleClick}>
            Add Friend
          </button>
        }
      </div>
      {loggedIn && (
        <div className='col-12 mb-3'>
          <ThoughtForm />
        </div>
      )}
      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-4">
          <PokemonList pokemon={user.currentTeam}
            title={`${user.username}'s Current Team:`}
            removefunc={handleRemove} />
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
