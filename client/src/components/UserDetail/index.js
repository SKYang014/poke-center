import React from 'react';
import { Link } from 'react-router-dom';

const UserDetail = ({ user, title }) => {
    if (!user) {
        return <h3>No Info Yet</h3>;
    }
    console.log(user)

    return (
        <div className='card'>
            <h3 className='card-header'>{title}</h3>
            <div className='card-body'>
                <h4>Adventure Start Date: </h4>

                {user.adventureStart}

                <h4>Gym Badges Earned:</h4>{user.gymBadges}/8
                <h4>PokeDex Completion: </h4>{user.pokeDexCompletion}/202
            </div>
        </div >
    );
};

export default UserDetail;