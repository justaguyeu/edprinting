import { useState, useCallback } from 'react';
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
} from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../../api';

export const SettingsPassword = () => {
  const [values, setValues] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    
    if (values.newPassword !== values.confirmPassword) {
      alert("New password and confirm password don't match.");
      return;
    }

    setLoading(true); // Start loading when submitting
    try {
      const token = localStorage.getItem('access_token');
      await axios.post(
        `${BASE_URL}/api/change-password/`, // Django backend endpoint for changing password
        {
          old_password: values.oldPassword,
          new_password: values.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Password updated successfully');
      setValues({ oldPassword: '', newPassword: '', confirmPassword: '' }); // Reset form fields
    } catch (error) {
      console.error('Error updating password:', error.response ? error.response.data : error.message);
      alert('Failed to update password.');
    } finally {
      setLoading(false); // Stop loading after completion
    }
  }, [values]);

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader subheader="Update Password" title="Password" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 400 }}>
            <TextField
              fullWidth
              label="Old Password"
              name="oldPassword"
              type="password"
              onChange={handleChange}
              value={values.oldPassword}
            />
            <TextField
              fullWidth
              label="New Password"
              name="newPassword"
              type="password"
              onChange={handleChange}
              value={values.newPassword}
            />
            <TextField
              fullWidth
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              onChange={handleChange}
              value={values.confirmPassword}
            />
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={loading} // Disable button while loading
            sx={{
              position: 'relative',
            }}
          >
            {loading && (
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
            {loading ? 'Updating...' : 'Update'}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
