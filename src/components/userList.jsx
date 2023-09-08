import { useState, useEffect } from 'react';
import { getAllUsers } from '../service/user'; // Adjust the path as needed

const UserCard = ({ username, picture }) => {
	return (
		<div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md">
			<img
				src={picture}
				alt={`${username} photo`}
				className="w-8 h-8 mr-4 rounded-full"
			/>
			<h3 className="font-semibold text-center text-md text-ellipsis">
				{username}
			</h3>
		</div>
	);
};

function UserList() {
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
			<div className="flex flex-col space-y-4">
				{users.map((user) => (
					<UserCard key={user.id} {...user} />
				))}
			</div>
		</div>
	);
}

export default UserList;
