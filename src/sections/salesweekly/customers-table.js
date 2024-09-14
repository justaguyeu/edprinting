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
import { SeverityPill } from 'src/components/severity-pill';

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
  const [outofstock, setOutofstock] = useState([]);
  const [debts, setDebts] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [filteredEntriess, setFilteredEntriess] = useState([]);
  const [filteredEntriesss, setFilteredEntriesss] = useState([]);
  const [filteredOutofstock, setFilteredOutofstock] = useState([]);
  const [filteredDebts, setFilteredDebts] = useState([]);
  const [loading, setLoading] = useState(false);

  const statusMap = {
    pending: 'warning',
    paid: 'success',
  };

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
    const fetchOutofstock = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          setLoading(true);
          const response = await axios.get(`${BASE_URL}/api/dataoutofstock/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setOutofstock(response.data);
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
    fetchOutofstock();
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
    const fetchEntriesDebt = async () => {
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
    fetchEntriesDebt();
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
    setFilteredOutofstock(filterEntriesByDateRange(outofstock));
    setFilteredDebts(filterEntriesByDateRange(debts));
  }, [startDate, endDate, entries, entriess, entriesss, outofstock, debts]);

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

  const calculatePaidDebtsTotal = (debts,) => {
    let totalPaidDebts = 0;

    debts.forEach((debt) => {
      // Check if debt is paid and the debt date matches the selected date
      if (debt.status === 'paid' && debt.date) {
        totalPaidDebts += Number(debt.amount) || 0;
      }
    });

    return totalPaidDebts;
  };
  const calculateunPaidDebtsTotal = (debts) => {
    let totalunPaidDebts = 0;

    debts.forEach((debt) => {
      // Check if debt is unpaid (pending) and the debt date matches the selected date
      if (debt.status === 'pending' && debt.date) {
        totalunPaidDebts += Number(debt.amount) || 0;
      }
    });

    return totalunPaidDebts;
  };
  // Calculate the totals for debts filtered by the selected date
  const totalPaidDebts = calculatePaidDebtsTotal(debts,);
  const totalunPaidDebts = calculateunPaidDebtsTotal(debts,);



  const calculateTotalsOutofstock = (outofstock) => {
    let totalOutofstock = 0;
    let totalOutPrice = 0;

    outofstock.forEach((entry) => {
      totalOutPrice += Number(entry.total_price) || 0;
      totalOutofstock += Number(entry.price) || 0;
    });

    const profit = totalOutPrice - totalOutofstock;

    return {
      totalOutPrice,
      totalOutofstock,
      profit,
    };
  };

  const totalsOut = calculateTotalsOutofstock(filteredOutofstock);




  const calculateTotalssss = (entries, entriess, entriesss,debts,
    outofstock,) => {
    let totalSalesPrice = 0;
    let totalBannerStickerPrice = 0;
    let totalExpenses = 0;
    let totalPaidDebts = 0;
    let totalOutPrice = 0;
    let totalunPaidDebts = 0;

    entries.forEach((entry) => {
      totalSalesPrice += Number(entry.total_price) || 0;
    });

    entriess.forEach((entry) => {
      totalBannerStickerPrice += Number(entry.total_price) || 0;
    });

    entriesss.forEach((entry) => {
      totalExpenses += Number(entry.expenses) || 0;
    });

    outofstock.forEach((entry) => {
      totalOutPrice += Number(entry.price) || 0;
    });

    debts.forEach((debt) => {
      if (debt.status === 'paid') {
        totalPaidDebts += Number(debt.amount) || 0;
      }
    });

    debts.forEach((debt) => {
      if (debt.status === 'pending') {
        totalunPaidDebts += Number(debt.amount) || 0;
      }
    });

    const totalProfit =
      totalSalesPrice + 
      totalBannerStickerPrice +
      totalOutPrice -
      totalExpenses;

    return {
      totalSalesPrice,
      totalBannerStickerPrice,
      totalExpenses,
      totalProfit,
      totalOutPrice,
      totalPaidDebts,
      totalunPaidDebts,
    };
  };

  const totalssss = calculateTotalssss(
    filteredEntries,
    filteredEntriess,
    filteredEntriesss,
    filteredDebts,
    filteredOutofstock,
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
            filteredOutofstock.length > 0 ||
            filteredDebts.length > 0 ||
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
                              Stock Sales
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
                              Non Stock Sales
                            </Typography>
                            <TableRow>
                              <TableCell>USERNAME</TableCell>
                              <TableCell>DATE</TableCell>
                              <TableCell> NAME</TableCell>
                              <TableCell>PRICE</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredOutofstock.map((entry) => {
                              return (
                                <TableRow>
                                  <TableCell>
                                    {entry.user ? entry.user : 'N/A'}
                                  </TableCell>
                                  <TableCell>{entry.date}</TableCell>
                                  <TableCell>{entry.name}</TableCell>
                                  <TableCell>
                                    {formatCurrency(entry.price) || 0}
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
                              Debts
                            </Typography>
                            <TableRow>
                              <TableCell>Stock Name</TableCell>
                              <TableCell>Customer Name</TableCell>
                              <TableCell>Amount</TableCell>
                              <TableCell>Date</TableCell>
                              <TableCell>Status</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredDebts.slice(0, 5).map((debt) => {
                              const createdAt = format(
                                new Date(debt.date),
                                'dd/MM/yyyy',
                              );
                              return (
                                <TableRow hover key={debt.id}>
                                  <TableCell>{debt.stock_name}</TableCell>
                                  <TableCell>{debt.debtor_name}</TableCell>
                                  <TableCell>
                                    {formatCurrency(debt.amount)}
                                  </TableCell>
                                  <TableCell>{createdAt}</TableCell>
                                  <TableCell>
                                    <SeverityPill
                                      color={statusMap[debt.status]}
                                    >
                                      {debt.status}
                                    </SeverityPill>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>TOTAL PAID DEBTS</TableCell>
                              <TableCell>TOTAL UNPAID DEBTS</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                {formatCurrency(totalPaidDebts)}
                              </TableCell>{' '}
                              {/* Total Paid Debts */}
                              <TableCell>
                                {formatCurrency(totalunPaidDebts)}
                              </TableCell>
                            </TableRow>
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
                            <TableCell>TOTAL NON STOCK SALES</TableCell>
                            <TableCell>TOTAL BANNER/STICKER SALES</TableCell>
                            <TableCell>TOTAL EXPENSES</TableCell>
                            {/* <TableCell>PROFIT MADE</TableCell> */}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              {formatCurrency(totals.totalSalesPrice)}
                            </TableCell>
                            <TableCell>
                                {formatCurrency(totalsOut.totalOutofstock)}
                              </TableCell>
                            <TableCell>
                              {formatCurrency(totalss.totalBannerStickerPrice)}
                            </TableCell>
                            <TableCell>
                              {formatCurrency(totalsss.totalExpenses)}
                            </TableCell>
                            {/* <TableCell>
                              {formatCurrency(totalssss.totalProfit)}
                            </TableCell> */}
                          </TableRow>
                        </TableBody>
                      </Table>
                      
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
                              Weekly Profit
                            </Typography>
                            <TableRow>
                              <TableCell>PROFIT MADE</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                {/* Profit formula that adds sales and paid debts and subtracts expenses */}
                                {formatCurrency(
                                  totalssss.totalSalesPrice +
                                    totalssss.totalBannerStickerPrice +
                                    totalsOut.totalOutofstock -
                                    totalssss.totalExpenses,
                                )}
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
