import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import React, { useState, useEffect } from 'react';
import { CustomersTable } from 'src/sections/stockadd/customers-table';
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
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';

const Page = () => {
  const [entries, setEntries] = useState([]);
  const [stockItems, setStockItems] = useState([]);
  const [stockItemss, setStockItemss] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({
    date: '',
    item_name: '',
    quantity: '',
  });

  const [formData2, setFormData2] = useState({
    date: '',
    item_name: '',
    area_in_square_meters: '',
  });

  useEffect(() => {
    const fetchEntries = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}/api/data/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setEntries(response.data);
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

  useEffect(() => {
    const fetchStockItems = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}/api/stock/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setStockItems(response.data);
        } catch (error) {
          console.error(
            'Error fetching stock data:',
            error.response ? error.response.data : error.message,
          );
        }
      }
    };
    fetchStockItems();
  }, []);

  useEffect(() => {
    const fetchStockItemss = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}/api/stock2/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setStockItemss(response.data);
        } catch (error) {
          console.error(
            'Error fetching stock data:',
            error.response ? error.response.data : error.message,
          );
        }
      }
    };
    fetchStockItemss();
  }, []);

  useEffect(() => {
    if (formData.item_name) {
      const selectedItem = stockItems.find(
        (item) => item.name === formData.item_name,
      );
      if (selectedItem) {
        setFormData((prevData) => ({
          ...prevData,
          total_price: selectedItem.price_per_unit * formData.quantity || '',
        }));
      }
    }
  }, [formData.item_name, formData.quantity, stockItems]);

  useEffect(() => {
    if (formData2.item_name) {
      const selectedItem = stockItemss.find(
        (item) => item.stock_name === formData2.item_name,
      );
      if (selectedItem) {
        setFormData2((prevData) => ({
          ...prevData,
          total_price:
            selectedItem.price_per_unit * formData2.area_in_square_meters || '',
        }));
      }
    }
  }, [formData2.item_name, formData2.area_in_square_meters, stockItemss]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const response = await axios.post(`${BASE_URL}/api/stock/`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEntries([...entries, response.data]);
        setFormData({ date: '', item_name: '', quantity: '' });

        setSuccessMessage(response.data.message);
      } catch (error) {
        console.error(
          'Data submission failed:',
          error.response ? error.response.data : error.message,
        );
      }
    } else {
      console.error('No token found');
    }
  };
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/stock2/`,
          formData2,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setEntries([...entries, response.data]);
        setFormData2({ date: '', item_name: '', area_in_square_meters: '' });

        setSuccessMessage(response.data.message);
      } catch (error) {
        console.error(
          'Data submission failed:',
          error.response ? error.response.data : error.message,
        );
      }
    } else {
      console.error('No token found');
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000); // Clear message after 5 seconds

      return () => clearTimeout(timer); // Clear timeout if the component unmounts
    }
  }, [successMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === 'quantity' || name === 'total_price' || name === 'expenses'
          ? parseFloat(value) || ''
          : value,
    });
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2({
      ...formData2,
      [name]:
        name === 'area_in_square_meters' ||
        name === 'total_price' ||
        name === 'expenses'
          ? parseFloat(value) || ''
          : value,
    });
  };

  return (
    <>
      <Head>
        <title>Restock </title>
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
              <CardContent></CardContent>
              <div className="form-container4">
                <form onSubmit={handleSubmit}>
                  <h3>ADD STOCK</h3>
                  <CardContent>
                    <Stack spacing={3} sx={{ maxWidth: 400 }}>
                      <select
                        name="item_name"
                        value={formData.item_name}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Choose Stock</option>
                        {stockItems.map((item, index) => (
                          <option key={index} value={item.name}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                      <TextField
                        fullWidth
                        label=" Quantity"
                        type="number"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                      />

                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                      <Button variant="contained" type="submit">
                        RESTOCK
                      </Button>
                    </Stack>{' '}
                  </CardContent>{' '}
                </form>

                <form onSubmit={handleSubmit2}>
                  <h3>ADD STOCK(BANNER & STICKER)</h3>
                  <CardContent>
                    <Stack spacing={3} sx={{ maxWidth: 400 }}>
                      <select
                        name="item_name"
                        value={formData2.item_name}
                        onChange={handleChange2}
                        required
                      >
                        <option value="">Choose Stock</option>
                        {stockItemss.map((item, index) => (
                          <option key={index} value={item.stock_name}>
                            {item.stock_name}
                          </option>
                        ))}
                      </select>
                      <TextField
                        fullWidth
                        label="Quantity"
                        type="number"
                        name="area_in_square_meters"
                        value={formData2.area_in_square_meters}
                        onChange={handleChange2}
                        required
                      />
                      <input
                        type="date"
                        name="date"
                        value={formData2.date}
                        onChange={handleChange2}
                        required
                      />
                      <Button variant="contained" type="submit">
                        RESTOCK
                      </Button>
                    </Stack>{' '}
                  </CardContent>
                </form>
              </div>
              <div>
                {successMessage && (
                  <div className="success-message">
                    <p>{successMessage}</p>
                  </div>
                )}
              </div>
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
