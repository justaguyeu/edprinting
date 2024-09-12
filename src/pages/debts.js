import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import {
  Box,
  Container,
  CardContent,
  Button,
  Stack,
  TextField,
  MenuItem,
  CircularProgress,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/userlayout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api';

const now = new Date();

const Page = () => {
  const [loading, setLoading] = useState(true);

  const [entries, setEntries] = useState([]);
  const [stockItems, setStockItems] = useState([]);

  const [formData, setFormData] = useState({
    stock_name: '',
    debtor_name: '',
    amount: '',
    date: '',
    status: 'pending',
  });

  const [loadingSales, setLoadingSales] = useState(false);

  useEffect(() => {
    const fetchStockItems = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          // Fetch both stock data simultaneously
          const [response1, response2] = await Promise.all([
            axios.get(`${BASE_URL}/available-stock/`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get(`${BASE_URL}/available-stock2/`, {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

          // Standardize and combine data
          const standardizedStockItems = [
            ...response1.data.map((item) => ({
              id: item.id,
              name: item.name || item.stock_name, // Use whichever name field is available
              price_per_unit:
                item.price_per_unit || item.price_per_square_meter,
              quantity: item.quantity || 0,
            })),
            ...response2.data.map((item) => ({
              id: item.id,
              name: item.stock_name || item.name, // Use whichever name field is available
              price_per_unit:
                item.price_per_square_meter || item.price_per_unit,
              quantity: 0, // Set a default value for quantity if it's not available
            })),
          ];

          console.log('Standardized stock items:', standardizedStockItems);

          // Update the state with standardized stock items
          setStockItems(standardizedStockItems);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSales(true);
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const response = await axios.post(`${BASE_URL}/debts/`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEntries([...entries, response.data]);
        setFormData({
          stock_name: '',
          debtor_name: '',
          amount: '',
          date: '',
          status: 'pending',
        });
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          // Display the specific error message
          alert(error.response.data.error);
        } else {
          console.error(
            'Data submission failed:',
            error.response ? error.response.data : error.message,
          );
        }
      } finally {
        setLoadingSales(false);
      }
    } else {
      console.error('No token found');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'amount') {
      // Handle amount formatting with commas
      const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
      setFormData({
        ...formData,
        [name]: numericValue, // Store raw numeric value without commas
      });
    } else if (name === 'debtor_name') {
      // Convert debtor name to uppercase
      const uppercasedName = value.toUpperCase();
      setFormData({
        ...formData,
        [name]: uppercasedName, // Store the capitalized name
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  // Helper function to format numbers with commas
  const formatWithCommas = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas every three digits
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
      <Head>
        <title>Forms</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          {/* <Grid container spacing={3}>
            <Grid
              container
              spacing={3}
              sx={{
                p: 2,
                alignItems: 'center',
                display: 'flex',
                flexDirection: 'column',
              }}
            > */}
          <CardContent>
            <div className="form-container4">
              <form onSubmit={handleSubmit}>
                <h2>DEBTS</h2>
                <CardContent>
                  <Stack spacing={3} sx={{ maxWidth: 400 }}>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                    <select
                      name="stock_name"
                      value={formData.stock_name}
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
  label="Debtor Name"
  name="debtor_name"
  value={formData.debtor_name} // Value will be in uppercase
  onChange={handleChange} // Automatically converts to uppercase
  required
/>


<TextField
  label="Amount"
  name="amount"
  type="text" // Change type to text to allow formatting with commas
  value={formatWithCommas(formData.amount)} // Display formatted amount with commas
  onChange={handleChange}
  required
/>

                    <TextField
                      label="Status"
                      name="status"
                      select
                      value={formData.status}
                      onChange={handleChange}
                      required
                    >
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="paid">Paid</MenuItem>
                    </TextField>
                    {/* <Button variant="contained" type="submit">
                          Submit
                        </Button> */}
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={loadingSales}
                      sx={{
                        position: 'relative',
                      }}
                    >
                      {loadingSales && (
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
                      {loadingSales ? 'Adding...' : 'Submit'}
                    </Button>
                  </Stack>
                </CardContent>
              </form>
            </div>
          </CardContent>
          {/* </Grid>
          </Grid> */}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
