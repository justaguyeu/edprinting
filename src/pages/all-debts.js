import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import axios from 'axios';
import { BASE_URL } from '../api';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const statusMap = {
  pending: 'warning',
  paid: 'success',
};

const Page = () => {
  const [filteredDebts, setFilteredDebts] = useState([]);
  const [entries, setDebts] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEntries = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        setLoading(true);
        try {
          const response = await axios.get(`${BASE_URL}/debts/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = Array.isArray(response.data) ? response.data : [];
          setDebts(data);
          setFilteredDebts(data);
        } catch (error) {
          console.error(
            'Error fetching data:',
            error.response ? error.response.data : error.message
          );
        } finally {
          setLoading(false);
        }
      } else {
        console.error('No token found');
      }
    };
    fetchEntries();
  }, []);

  useEffect(() => {
    const filterEntriesByDateRange = (entries) => {
      if (startDate && endDate) {
        return entries.filter((entry) => {
          const entryDate = new Date(entry.date);
          return entryDate >= new Date(startDate) && entryDate <= new Date(endDate);
        });
      }
      return entries;
    };

    setFilteredDebts(filterEntriesByDateRange(entries));
  }, [startDate, endDate, entries]);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleDeleteDebt = async (id) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      if (window.confirm('Are you sure you want to delete this debt?')) {
        try {
          await axios.delete(`${BASE_URL}/debts/${id}/`,{
            headers: { Authorization: `Bearer ${token}` },
          });
          setFilteredDebts(filteredDebts.filter((debt) => debt.id !== id));
        } catch (error) {
          console.error('Error deleting debt:', error.response ? error.response.data : error.message);
        }
      }
    } else {
      console.error('No token found');
    }
  };

  return (
    <Card>
      <Box
        spacing={3}
        sx={{
          p: 2,
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <CardContent>
          <label htmlFor="start-date">Start Date: </label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </CardContent>
        <CardContent>
          <label htmlFor="end-date">End Date: </label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </CardContent>
      </Box>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div>
          {startDate && endDate ? (
            filteredDebts.length > 0 ? (
              <>
                <CardContent>
                  <Card>
                    <Scrollbar>
                      <Box sx={{ minWidth: 800 }}>
                        <Table>
                          <TableHead>
                            <Typography
                              variant="h6"
                              sx={{
                                p: 2,
                                alignItems: 'center',
                                display: 'flex',
                                flexDirection: 'row',
                              }}
                            >
                              All Debts
                            </Typography>
                            <TableRow>
                              <TableCell>Stock Name</TableCell>
                              <TableCell>Customer Name</TableCell>
                              <TableCell>Amount</TableCell>
                              <TableCell>Date</TableCell>
                              <TableCell>Status</TableCell>
                              <TableCell>Action</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredDebts.map((debt) => {
                              const createdAt = format(new Date(debt.date), 'dd/MM/yyyy');
                              return (
                                <TableRow hover key={debt.id}>
                                  <TableCell>{debt.stock_name}</TableCell>
                                  <TableCell>{debt.debtor_name}</TableCell>
                                  <TableCell>{debt.amount}</TableCell>
                                  <TableCell>{createdAt}</TableCell>
                                  <TableCell>
                                    <SeverityPill color={statusMap[debt.status]}>
                                      {debt.status}
                                    </SeverityPill>
                                  </TableCell>
                                  <TableCell>
                                    <Button
                                      variant="contained"
                                      color="error"
                                      onClick={() => handleDeleteDebt(debt.id)}
                                    >
                                      Delete
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </Box>
                    </Scrollbar>
                  </Card>
                </CardContent>
              </>
            ) : (
              <p>No debts available for the selected date range.</p>
            )
          ) : (
            <p>Please select a date range to view the Debts.</p>
          )}
        </div>
      )}
      <Divider />
    </Card>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
