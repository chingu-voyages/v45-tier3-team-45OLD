import { useState, useEffect } from 'react';
import { getAllUsers } from '../service/user'; // Adjust the path as needed
import { Link } from 'react-router-dom';

const UserCard = ({ username, picture, email }) => {
  return (
    <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md">
      <Link to={`/dashboard/user-profile/${email}`}>
        <img
          src={picture}
          alt={`${username} photo`}
          className="w-8 h-8 mr-4 rounded-full"
        />
      </Link>
      <h3 className="text-base font-semibold text-center text-ellipsis">
        {username}
      </h3>
    </div>
  );
};

function AllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await getAllUsers();
        setUsers(userList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h2 className="mb-6 text-xl font-bold text-center">Users</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} {...user} />
        ))}
      </div>
    </div>
  );
}

export default AllUsers;