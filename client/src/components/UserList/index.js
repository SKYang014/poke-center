import React from 'react';
import { Link } from 'react-router-dom';

const UserList = ({ user, title }) => {
    return (
        <div className="card mb-3">
            <div className="card-header">
                <span className="text-light">{title}</span>
            </div>
            <div className="card-body">
                {user &&
                    user.map(user => (
                        <p className="pill mb-3" key={user._id}>
                            {user.username} {'// '}
                            <Link to={`/profile/${user.username}`}
                                style={{ fontWeight: 700 }}>
                            </Link>

                        </p>

                    ))}

            </div>
        </div>
    );
};

export default UserList;