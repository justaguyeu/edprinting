import PropTypes from 'prop-types';
import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../api';
import { useRouter } from 'next/router';

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;
  const [dailyTotals, setDailyTotals] = useState([]);
  const [monthlyTotals, setMonthlyTotals] = useState({});
  const [month, setMonth] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch monthly report data
  const fetchMonthlyReport = async (month) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/api/data/monthly/`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { month },
        });

        setDailyTotals(response.data.daily_totals);
        setMonthlyTotals(response.data.monthly_totals);
        setLoading(false);
      } catch (error) {
        console.error(
          'Error fetching monthly report:',
          error.response ? error.response.data : error.message,
        );
        setLoading(false);
      }
    } else {
      console.error('No token found');
    }
  };

  // Handle month change
  const handleMonthChange = (e) => {
    const selectedMonth = e.target.value;
    setMonth(selectedMonth);
    fetchMonthlyReport(selectedMonth);
    router.push(`/salesmonthly?month=${selectedMonth}`);
  };

  // Initialize month from URL if present
  useEffect(() => {
    const monthParam = new URLSearchParams(router.search).get('month');
    if (monthParam) {
      setMonth(monthParam);
      fetchMonthlyReport(monthParam);
    }
  }, [router.search]);

  const calculateDailyProfit = (total) => {
    return Number(total.total_sales) - Number(total.total_expenses);
  };

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
    <>
      <Card
        spacing={3}
        sx={{
          p: 2,
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <CardContent>
          <label htmlFor="month-select">Select Month: </label>
          <input
            type="month"
            id="month-select"
            value={month}
            onChange={handleMonthChange}
          />
        </CardContent>
      </Card>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {dailyTotals.length > 0 ? (
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
                            Sales
                          </Typography>
                          <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>TOTAL DAILY PRICE</TableCell>
                            <TableCell>TOTAL DAILY EXPENSES</TableCell>
                            <TableCell>TOTAL DAILY PROFIT</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {dailyTotals.map((total) => {
                            return (
                              <TableRow>
                                <TableCell>{total.date}</TableCell>
                                <TableCell>
                                  {formatCurrency(total.total_sales)}
                                </TableCell>
                                <TableCell>
                                  {formatCurrency(total.total_expenses)}
                                </TableCell>
                                <TableCell>
                                  {formatCurrency(calculateDailyProfit(total))}
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

              <CardContent>
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
                          Monthly Totals
                        </Typography>
                        <TableRow>
                          <TableCell>TOTAL MONTHLY PRICE</TableCell>
                          <TableCell>TOTAL MONTHLY EXPENSES</TableCell>
                          <TableCell>TOTAL MONTHLY PROFIT</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell>
                            {formatCurrency(monthlyTotals.total_sales)}
                          </TableCell>
                          <TableCell>
                            {formatCurrency(monthlyTotals.total_expenses)}
                          </TableCell>
                          <TableCell>
                            {formatCurrency(monthlyTotals.profit)}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Box>
                </Scrollbar>
              </CardContent>
            </>
          ) : (
            <p>No data available for the selected month.</p>
          )}
        </div>
      )}
    </>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
