/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, addUser, removeUser } from './userSlice';
import { useEffect } from 'react';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users.data);
  const loading = useSelector(state => state.users.loading);
  const error = useSelector(state => state.users.error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = () => {
    dispatch(addUser({ name: 'Tadesse Jemal', email: 'tadesse@example.com' }));
  };

  const handleRemoveUser = (userId) => {
    dispatch(removeUser(userId));
  };

  if (loading === 'pending') {
    return <div>Loading...</div>;
  }

  if (loading === 'rejected') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <button onClick={ handleAddUser }>Add User</button>
      { users.map(user => (
        <div key={user.id}>
          <span>{user.name}</span>
          <span>{user.email}</span>
          <button onClick={() => handleRemoveUser(user.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}

export default UserList;

