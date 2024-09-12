import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api';

import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  CardContent,
  TextField,
  Stack,
  Typography,
  CircularProgress,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/stockadd/customers-table';

const Page = () => {
  const [stockItems, setStockItems] = useState([]);
  const [stockItemss, setStockItemss] = useState([]);
  const [newStock, setNewStock] = useState({
    name: '',
    quantity: '',
    price_per_unit: '',
    added_date: '',
  });
  const [newStocks, setNewStocks] = useState({
    stock_name: '',
    area_in_square_meters: '',
    price_per_square_meter: '',
    added_date: '',
  });
  const [loadingStock, setLoadingStock] = useState(false);
  const [loadingStock2, setLoadingStock2] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [noStockMessage, setNoStockMessage] = useState('');

  useEffect(() => {
    const fetchStockItems = async () => {
      if (!selectedMonth) {
        setStockItems([]);
        setNoStockMessage('');
        return;
      }

      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          setLoadingStock(true);
          const response = await axios.get(`${BASE_URL}/api/stock/`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { month: selectedMonth },
          });

          if (response.data.length === 0) {
            setStockItems([]);
            setNoStockMessage('No available stock for the selected month.');
          } else {
            setStockItems(response.data);
            setNoStockMessage('');
          }
        } catch (error) {
          console.error(
            'Error fetching stock data:',
            error.response ? error.response.data : error.message,
          );
          setNoStockMessage('Error fetching stock data.');
        } finally {
          setLoadingStock(false);
        }
      }
    };

    fetchStockItems();
  }, [selectedMonth]);

  useEffect(() => {
    const fetchStockItemss = async () => {
      if (!selectedMonth) {
        setStockItemss([]);
        setNoStockMessage('');
        return;
      }

      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          setLoadingStock2(true);
          const response = await axios.get(`${BASE_URL}/api/stock2/`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { month: selectedMonth },
          });
          console.log(response.data);

          if (response.data.length === 0) {
            setStockItemss([]);
            setNoStockMessage('No available stock for the selected month.');
          } else {
            setStockItemss(response.data);
            setNoStockMessage('');
          }
        } catch (error) {
          console.error(
            'Error fetching stock data:',
            error.response ? error.response.data : error.message,
          );
          setNoStockMessage('Error fetching stock data.');
        } finally {
          setLoadingStock2(false);
        }
      }
    };

    fetchStockItemss();
  }, [selectedMonth]);

  const handleAddStock = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    if (token) {
      setLoadingStock(true); // Set loading to true when starting the operation
      try {
        await axios.post(`${BASE_URL}/api/stocka/`, newStock, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setNewStock({
          name: '',
          quantity: '',
          price_per_unit: '',
          added_date: '',
        });

        const response = await axios.get(`${BASE_URL}/api/stock/`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { month: selectedMonth },
        });

        if (response.data.length === 0) {
          setStockItems([]);
          setNoStockMessage('No available stock for the selected month.');
        } else {
          setStockItems(response.data);
          setNoStockMessage('');
        }
      } catch (error) {
        console.error(
          'Error adding stock:',
          error.response ? error.response.data : error.message,
        );
      } finally {
        setLoadingStock(false); // Ensure loading is set to false after operation
      }
    }
  };

  const handleAddStock2 = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    if (token) {
      setLoadingStock2(true);
      try {
        await axios.post(`${BASE_URL}/api/stock2a/`, newStocks, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setNewStocks({
          stock_name: '',
          area_in_square_meters: '',
          price_per_square_meter: '',
          added_date: '',
        });

        const response = await axios.get(`${BASE_URL}/api/stock2/`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { month: selectedMonth },
        });

        if (response.data.length === 0) {
          setStockItemss([]);
          setNoStockMessage('No available stock for the selected month.');
        } else {
          setStockItemss(response.data);
          setNoStockMessage('');
        }
      } catch (error) {
        console.error(
          'Error adding stock:',
          error.response ? error.response.data : error.message,
        );
      } finally {
        setLoadingStock2(false); // Ensure loading is set to false after operation
      }
    }
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

  const getFormattedMonthYear = (month) => {
    if (!month) return '';

    const [year, monthNumber] = month.split('-');
    const date = new Date(year, monthNumber - 1);

    const monthName = date.toLocaleString('default', { month: 'long' });
    return `${monthName} ${year}`;
  };



  
  // Helper function to format numbers with commas
  const formatWithCommas = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas every three digits
  };

  return (
    <>
      <Head>
        <title>Add Stock</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">ADD STOCK</Typography>
              </Stack>
            </Stack>

            <Grid
              container
              spacing={3}
              sx={{
                p: 2,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardContent>
                <div className="form-container4">
                  <form onSubmit={handleAddStock}>
                    <h3>ADD STOCK</h3>
                    <CardContent>
                      <Stack spacing={3} sx={{ maxWidth: 400 }}>
                        <TextField
                          fullWidth
                          label="Stock Name"
                          type="text"
                          value={newStock.name}
                          onChange={(e) =>
                            setNewStock({ ...newStock, name: e.target.value })
                          }
                          required
                        />
                        <TextField
                          fullWidth
                          label="Quantity"
                          type="number"
                          value={newStock.quantity}
                          onChange={(e) =>
                            setNewStock({
                              ...newStock,
                              quantity: e.target.value,
                            })
                          }
                          required
                        />
                        <TextField
                          fullWidth
                          label="Price per Unit"
                          type="text"
                          value={formatWithCommas(newStock.price_per_unit)}
                          onChange={(e) =>
                            setNewStock({
                              ...newStock,
                              price_per_unit: e.target.value.replace(/\D/g, ''),
                            })
                          }
                          // onChange={handleChange}
                          required
                        />
                        <input
                          type="date"
                          value={newStock.added_date}
                          onChange={(e) =>
                            setNewStock({
                              ...newStock,
                              added_date: e.target.value,
                            })
                          }
                          required
                        />
                        <Button
                          fullWidth
                          size="large"
                          sx={{
                            mt: 3,
                            position: 'relative',
                          }}
                          type="submit"
                          variant="contained"
                          disabled={loadingStock}
                        >
                          {loadingStock && (
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
                          {loadingStock ? 'Adding...' : 'Add Stock'}
                        </Button>
                      </Stack>
                    </CardContent>
                  </form>

                  <form onSubmit={handleAddStock2}>
                    <h3>ADD STOCK (BANNER & STICKER)</h3>
                    <CardContent>
                      <Stack spacing={3} sx={{ maxWidth: 400 }}>
                        <TextField
                          fullWidth
                          label="Stock Name"
                          type="text"
                          value={newStocks.stock_name}
                          onChange={(e) =>
                            setNewStocks({
                              ...newStocks,
                              stock_name: e.target.value,
                            })
                          }
                          required
                        />
                        <TextField
                          fullWidth
                          label="Square meters"
                          type="number"
                          value={newStocks.area_in_square_meters}
                          onChange={(e) =>
                            setNewStocks({
                              ...newStocks,
                              area_in_square_meters: e.target.value,
                            })
                          }
                          required
                        />
                        <TextField
                          fullWidth
                          label="Price per Square Metre"
                          type="number"
                          value={newStocks.price_per_square_meter}
                          onChange={(e) =>
                            setNewStocks({
                              ...newStocks,
                              price_per_square_meter: e.target.value,
                            })
                          }
                          required
                        />
                        <input
                          type="date"
                          value={newStocks.added_date}
                          onChange={(e) =>
                            setNewStocks({
                              ...newStocks,
                              added_date: e.target.value,
                            })
                          }
                          required
                        />
                        <Button
                          fullWidth
                          size="large"
                          sx={{
                            mt: 3,
                            position: 'relative',
                          }}
                          type="submit"
                          variant="contained"
                          disabled={loadingStock2}
                        >
                          {loadingStock2 && (
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
                          {loadingStock2 ? 'Adding...' : 'Add Stock (Banner & Sticker)'}
                        </Button>
                      </Stack>
                    </CardContent>
                  </form>
                </div>
              </CardContent>
            </Grid>
            <CustomersTable />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
