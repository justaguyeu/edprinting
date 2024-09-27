import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const NotificationPanel = ({ notifications }) => {
  return (
    <List>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <ListItem key={notification.id}>
            <ListItemText primary={notification.message} secondary={new Date(notification.created_at).toLocaleString()} />
          </ListItem>
        ))
      ) : (
        <ListItem>
          <ListItemText primary="No new notifications" />
        </ListItem>
      )}
    </List>
  );
};

export default NotificationPanel;
