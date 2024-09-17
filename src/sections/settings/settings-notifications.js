import { useCallback, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../../api'; // Ensure you set your BASE_URL

export const SettingsNotifications = () => {
  const [email, setEmail] = useState(true);
  const [push, setPush] = useState(true);
  const [text, setText] = useState(false);
  const [phoneCall, setPhoneCall] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [preferredMethod, setPreferredMethod] = useState('email');
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();

    setLoading(true); // Start loading when submitting

    try {
      const token = localStorage.getItem('access_token'); // Use token from local storage
      await axios.post(
        `${BASE_URL}/api/update-preferences/`, // API endpoint for updating preferences
        {
          email,
          push,
          text,
          phone_call: phoneCall,
          phone_number: phoneNumber,
          email_address: emailAddress,
          preferred_method: preferredMethod
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Pass token in request headers
        }
      );
      alert('Preferences updated successfully');
    } catch (error) {
      console.error('Error updating preferences:', error.response ? error.response.data : error.message);
      alert('Failed to update preferences.');
    } finally {
      setLoading(false); // Stop loading after completion
    }
  }, [email, push, text, phoneCall, phoneNumber, emailAddress, preferredMethod]);

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Manage the notifications"
          title="Notifications"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid xs={12} sm={6} md={4}>
              <Stack spacing={1}>
                <Typography variant="h6">Notifications</Typography>
                <Stack>
                  <FormControlLabel
                    control={<Checkbox checked={email} onChange={(e) => setEmail(e.target.checked)} />}
                    label="Email"
                  />
                 
                  <FormControlLabel
                    control={<Checkbox checked={text} onChange={(e) => setText(e.target.checked)} />}
                    label="Text Messages"
                  />
                </Stack>
              </Stack>
            </Grid>

            {/* New Section for Phone Number and Email Address */}
            <Grid xs={12} sm={6} md={4}>
              <Stack spacing={1}>
                <Typography variant="h6">Contact Information</Typography>
                <TextField
                  label="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Email Address"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  fullWidth
                />
              </Stack>
            </Grid>

            {/* New Section for Preferred Notification Method */}
            <Grid xs={12} sm={6} md={4}>
              <Stack spacing={1}>
                <Typography variant="h6">Notification Method</Typography>
                <FormControl fullWidth>
                  {/* <InputLabel>Preferred Method</InputLabel> */}
                  <Select
                    value={preferredMethod}
                    onChange={(e) => setPreferredMethod(e.target.value)}
                    label="Preferred Method"
                  >
                    <MenuItem value="email">Email</MenuItem>
                    <MenuItem value="text">Text Message</MenuItem>
                    
                  </Select>
                </FormControl>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit" disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
