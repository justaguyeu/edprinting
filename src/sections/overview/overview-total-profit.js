import PropTypes from 'prop-types';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';

export const OverviewTotalProfit = (props) => {
  const { value, sx } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Weekly Profit
              <Avatar
                sx={{
                  backgroundColor: 'primary.main',
                  height: 56,
                  width: 56,
                }}
              >
                <SvgIcon>
                  <CurrencyDollarIcon />
                </SvgIcon>
              </Avatar>
            </Typography>
            <Typography variant="h5">{value}</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTotalProfit.propTypes = {
  value: PropTypes.string,
  sx: PropTypes.object,
};
