import { useCallback, useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Divider,
  Stack,
  TextField,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../../api';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';

export const SettingsUser = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    username: '',
    password: '',
  });
  const [loadingAddUser, setLoadingAddUser] = useState(false); // Loading for add user
  const [loadingDeleteUserId, setLoadingDeleteUserId] = useState(null); // Loading for delete user

  const fetchUsers = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users/`); // Django backend endpoint for users
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }, []);

  const handleAddUser = useCallback(async (event) => {
    event.preventDefault();
    setLoadingAddUser(true); // Start loading when submitting
    try {
      await axios.post(`${BASE_URL}/api/users/`, newUser); // Django backend endpoint to add a user
      fetchUsers(); // Reload users after adding
      setNewUser({ username: '', password: '' }); // Reset form fields
    } catch (error) {
      console.error('Error adding user:', error);
    } finally {
      setLoadingAddUser(false); // Stop loading after completion
    }
  }, [newUser, fetchUsers]);

  const handleDeleteUser = useCallback(async (userId) => {
    setLoadingDeleteUserId(userId); // Set loading state for the specific user
    try {
      await axios.delete(`${BASE_URL}/api/users/${userId}/`); // Django backend endpoint to delete a user
      fetchUsers(); // Reload users after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setLoadingDeleteUserId(null); // Reset loading state after completion
    }
  }, [fetchUsers]);

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, [fetchUsers]);

  return (
    <div>
      <Card>
        <CardHeader subheader="Manage Users" title="Users" />
        <Divider />
        <CardContent>
          <List>
            {users.map((user) => (
              <ListItem
                key={user.id}
                secondaryAction={
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteUser(user.id)}
                    disabled={loadingDeleteUserId === user.id} // Disable button while loading
                    sx={{
                      position: 'relative',
                    }}
                    startIcon={
                      loadingDeleteUserId === user.id ? (
                        <CircularProgress
                          size={24}
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            marginTop: '-12px',
                            marginLeft: '-12px',
                          }}
                        />
                      ) : (
                        <TrashIcon className="h-5 w-5" />
                      )
                    }
                  >
                    {loadingDeleteUserId === user.id ? 'Deleting...' : 'Delete'}
                  </Button>
                }
              >
                <ListItemText primary={user.username} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

      <Card sx={{ mt: 2 }}>
        <CardHeader subheader="Add New User" title="Add User" />
        <Divider />
        <form onSubmit={handleAddUser}>
          <CardContent>
            <Stack spacing={3} sx={{ maxWidth: 400 }}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
            </Stack>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loadingAddUser} // Disable button while loading
              sx={{
                position: 'relative',
              }}
            >
              {loadingAddUser && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-12px',
                    marginLeft: '-12px',
                  }}
                />
              )}
              {loadingAddUser ? 'Adding...' : 'Add User'}
            </Button>
          </CardActions>
        </form>
      </Card>
    </div>
  );
};
