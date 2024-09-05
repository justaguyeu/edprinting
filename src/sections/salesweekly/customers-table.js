import PropTypes from 'prop-types';
import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../api';

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
  const [entries, setEntries] = useState([]);
  const [entriess, setEntriess] = useState([]);
  const [entriesss, setEntriesss] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [filteredEntriess, setFilteredEntriess] = useState([]);
  const [filteredEntriesss, setFilteredEntriesss] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEntries = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          setLoading(true);
          const response = await axios.get(`${BASE_URL}/api/data/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setEntries(response.data);
          setLoading(false);
        } catch (error) {
          console.error(
            'Error fetching data:',
            error.response ? error.response.data : error.message,
          );
          setLoading(false);
        }
      } else {
        console.error('No token found');
      }
    };
    fetchEntries();
  }, []);

  useEffect(() => {
    const fetchEntriess = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          setLoading(true);
          const response = await axios.get(`${BASE_URL}/api/data2/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setEntriess(response.data);
          setLoading(false);
        } catch (error) {
          console.error(
            'Error fetching data:',
            error.response ? error.response.data : error.message,
          );
          setLoading(false);
        }
      } else {
        console.error('No token found');
      }
    };
    fetchEntriess();
  }, []);

  useEffect(() => {
    const fetchEntriesss = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          setLoading(true);
          const response = await axios.get(`${BASE_URL}/api/dataexpense/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setEntriesss(response.data);
          setLoading(false);
        } catch (error) {
          console.error(
            'Error fetching data:',
            error.response ? error.response.data : error.message,
          );
          setLoading(false);
        }
      } else {
        console.error('No token found');
      }
    };
    fetchEntriesss();
  }, []);

  useEffect(() => {
    const filterEntriesByDateRange = (entries) => {
      if (startDate && endDate) {
        return entries.filter((entry) => {
          const entryDate = new Date(entry.date);
          return (
            entryDate >= new Date(startDate) && entryDate <= new Date(endDate)
          );
        });
      }
      return entries;
    };

    setFilteredEntries(filterEntriesByDateRange(entries));
    setFilteredEntriess(filterEntriesByDateRange(entriess));
    setFilteredEntriesss(filterEntriesByDateRange(entriesss));
  }, [startDate, endDate, entries, entriess, entriesss]);

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
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

  const calculateTotals = (entries) => {
    let totalExpenses = 0;
    let totalSalesPrice = 0;

    entries.forEach((entry) => {
      totalSalesPrice += Number(entry.total_price) || 0;
      totalExpenses += Number(entry.expenses) || 0;
    });

    const profit = totalSalesPrice - totalExpenses;

    return {
      totalSalesPrice,
      totalExpenses,
      profit,
    };
  };

  const totals = calculateTotals(filteredEntries);

  const calculateTotalss = (entriess) => {
    let totalExpenses = 0;
    let totalBannerStickerPrice = 0;

    entriess.forEach((entry) => {
      totalBannerStickerPrice += Number(entry.total_price) || 0;
      totalExpenses += Number(entry.expenses) || 0;
    });

    const profit = totalBannerStickerPrice - totalExpenses;

    return {
      totalBannerStickerPrice,
      totalExpenses,
      profit,
    };
  };

  const totalss = calculateTotalss(filteredEntriess);

  const calculateTotalsss = (entriesss) => {
    let totalExpenses = 0;
    let totalPrice = 0;

    entriesss.forEach((entry) => {
      totalPrice += Number(entry.total_price) || 0;
      totalExpenses += Number(entry.expenses) || 0;
    });

    const profit = totalPrice - totalExpenses;

    return {
      totalPrice,
      totalExpenses,
      profit,
    };
  };

  const totalsss = calculateTotalsss(filteredEntriesss);

  const calculateTotalssss = (entries, entriess, entriesss) => {
    let totalSalesPrice = 0;
    let totalBannerStickerPrice = 0;
    let totalExpenses = 0;

    entries.forEach((entry) => {
      totalSalesPrice += Number(entry.total_price) || 0;
    });

    entriess.forEach((entry) => {
      totalBannerStickerPrice += Number(entry.total_price) || 0;
    });

    entriesss.forEach((entry) => {
      totalExpenses += Number(entry.expenses) || 0;
    });

    const totalProfit =
      totalSalesPrice + totalBannerStickerPrice - totalExpenses;

    return {
      totalSalesPrice,
      totalBannerStickerPrice,
      totalExpenses,
      totalProfit,
    };
  };

  const totalssss = calculateTotalssss(
    filteredEntries,
    filteredEntriess,
    filteredEntriesss,
  );

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
      </Card>
      {loading ? (
        <p>Loading data...</p>
      ) : (
        <div>
          {startDate && endDate ? (
            filteredEntries.length > 0 ||
            filteredEntriess.length > 0 ||
            filteredEntriesss.length > 0 ? (
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
                              <TableCell>USERNAME</TableCell>
                              <TableCell>DATE</TableCell>
                              <TableCell>ITEM NAME</TableCell>
                              <TableCell>QUANTITY</TableCell>
                              <TableCell>PRICE</TableCell>
                              <TableCell>DISCOUNT PRICE</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredEntries.map((entry) => {
                              return (
                                <TableRow>
                                  <TableCell>
                                    {entry.user ? entry.user : 'N/A'}
                                  </TableCell>
                                  <TableCell>{entry.date}</TableCell>
                                  <TableCell>{entry.item_name}</TableCell>
                                  <TableCell>{entry.quantity}</TableCell>
                                  <TableCell>
                                    {formatCurrency(entry.total_price)}
                                  </TableCell>
                                  <TableCell>
                                    {formatCurrency(entry.discount_price)}
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                          <TableBody>
                            {filteredEntriess.map((entry) => {
                              return (
                                <TableRow>
                                  <TableCell>
                                    {entry.user ? entry.user : 'N/A'}
                                  </TableCell>
                                  <TableCell>{entry.date}</TableCell>
                                  <TableCell>{entry.item_name}</TableCell>
                                  <TableCell>
                                    {entry.area_in_square_meters}
                                  </TableCell>
                                  <TableCell>
                                    {formatCurrency(entry.total_price)}
                                  </TableCell>
                                  <TableCell>
                                    {formatCurrency(entry.discount_price)}
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
                              Expenses
                            </Typography>
                            <TableRow>
                              <TableCell>USERNAME</TableCell>
                              <TableCell>DATE</TableCell>
                              <TableCell>EXPENSE TYPE</TableCell>
                              <TableCell>EXPENSE PRICE</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredEntriesss.map((entry) => {
                              return (
                                <TableRow>
                                  <TableCell>
                                    {entry.user ? entry.user : 'N/A'}
                                  </TableCell>
                                  <TableCell>{entry.date}</TableCell>
                                  <TableCell>{entry.expense_name}</TableCell>
                                  <TableCell>
                                    {formatCurrency(entry.expenses) || 0}
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
                            Weekly Totals
                          </Typography>
                          <TableRow>
                            <TableCell>TOTAL SALES</TableCell>
                            <TableCell>TOTAL BANNER/STICKER SALES</TableCell>
                            <TableCell>TOTAL EXPENSES</TableCell>
                            <TableCell>PROFIT MADE</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              {formatCurrency(totals.totalSalesPrice)}
                            </TableCell>
                            <TableCell>
                              {formatCurrency(totalss.totalBannerStickerPrice)}
                            </TableCell>
                            <TableCell>
                              {formatCurrency(totalsss.totalExpenses)}
                            </TableCell>
                            <TableCell>
                              {formatCurrency(totalssss.totalProfit)}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Box>
                  </Scrollbar>
                </CardContent>
              </>
            ) : (
              <p>No data available for the selected date range.</p>
            )
          ) : (
            <p>Please select a date range to view the data.</p>
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
