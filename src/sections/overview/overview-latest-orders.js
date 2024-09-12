import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import axios from 'axios';  // Ensure axios is imported
import { BASE_URL } from '../../api';  // Ensure BASE_URL is imported

const statusMap = {
  pending: 'warning',
  paid: 'success',
};



export const OverviewLatestOrders = (props) => {
  const { sx } = props;
  const [debts, setDebts] = useState([]);
  const router = useRouter();
  
const handleClick = () => {
  router.push('/all-debts');  // Navigate to the specified path
};
  useEffect(() => {
    const fetchEntries = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}/debts/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setDebts(response.data);
        } catch (error) {
          console.error(
            'Error fetching data:',
            error.response ? error.response.data : error.message,
          );
        }
      } else {
        console.error('No token found');
      }
    };
    fetchEntries();
  }, []);

  const formatCurrency = (value) => {
    const numericValue = Number(value) || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
      .format(numericValue)
      .replace('TZS', 'Tsh');
  };

  return (
    <Card sx={sx}>
      <CardHeader title="Current Debts" />
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Stock Name</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {debts.slice(0, 5).map((debt) => {
                const createdAt = format(new Date(debt.date), 'dd/MM/yyyy');
                return (
                  <TableRow hover key={debt.id}>
                    <TableCell>{debt.stock_name}</TableCell>
                    <TableCell>{debt.debtor_name}</TableCell>
                    <TableCell>{formatCurrency(debt.amount)}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[debt.status]}>
                        {debt.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          onClick={handleClick}
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

OverviewLatestOrders.propTypes = {
  sx: PropTypes.object,
};
