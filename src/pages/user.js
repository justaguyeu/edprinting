import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container,CardContent,Button,Stack, TextField, Unstable_Grid2 as Grid } from '@mui/material';
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
  const [weeklyTotals, setWeeklyTotals] = useState({});
  const [dailyTotals, setDailyTotals] = useState({});
  const [chartSeries, setChartSeries] = useState([]);
  const [loading, setLoading] = useState(true);


  const [entries, setEntries] = useState([]);
  const [entriess, setEntriess] = useState([]);
  const [entriesss, setEntriesss] = useState([]);
  const [stockItems, setStockItems] = useState([]);
  const [stockItemss, setStockItemss] = useState([]);
  // const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    item_name: '',
    quantity: '',
    total_price: '',
    discount_price: '',
  });
  const [formData3, setFormData3] = useState({
    date: '',
    expense_name: '',
    expenses: '',
  });

  const [formData2, setFormData2] = useState({
    date: '',
    item_name: '',
    area_in_square_meters: '',
    total_price: '',
    discount_price: ''
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
          console.error('Error fetching data:', error.response ? error.response.data : error.message);
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
          const response = await axios.get(`${BASE_URL}/api/data2/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setEntriess(response.data);
        } catch (error) {
          console.error('Error fetching data:', error.response ? error.response.data : error.message);
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
          const response = await axios.get(`${BASE_URL}/api/dataexpense/`, {
            headers: { Authorization: `Bearer ${token}`},
          });
          console.log(response.data)
          setEntriesss(response.data);
        } catch (error) {
          console.error('Error fetching data:', error.response ? error.response.data : error.message);
        }
      } else {
        console.error('No token found');
      }
    };
    fetchEntriesss();
  }, []);

  useEffect(() => {
    const fetchStockItems = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await axios.get(`${BASE_URL}/available-stock/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // const setStockItems = response.data.filter(item => item.remaining_stock > 0);
          console.log(response.data)
          // setStockItems(availableStockItems);
          
          
          setStockItems(response.data);
        } catch (error) {
          console.error('Error fetching stock data:', error.response ? error.response.data : error.message);
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
          const response = await axios.get(`${BASE_URL}/available-stock2/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // const setStockItemss = response.data.filter(item => item.remaining_stock > 0);

          // setStockItemss(availableStockItems);
          // console.log('Fetched stockItemss:', stockItemss);
          setStockItemss(response.data);
        } catch (error) {
          console.error('Error fetching stock data:', error.response ? error.response.data : error.message);
        }
      }
    };
    fetchStockItemss();
  }, []);


  useEffect(() => {
    if (formData2.item_name) {
      const selectedItem = stockItemss.find(item => item.stock_name === formData2.item_name);
      if (selectedItem) {
        const pricePerSquareMeter = selectedItem.price_per_square_meter;
        const area = formData2.area_in_square_meters || 0;
  
        // Calculate the price based on area
        const priceWithoutDiscount = pricePerSquareMeter * area;
  
        // Apply discount if provided
        const discount = formData2.discount_price || 0;
        const totalPrice = priceWithoutDiscount - discount;
  
        setFormData2(prevData => ({
          ...prevData,
          total_price: totalPrice > 0 ? totalPrice : 0, // Ensure the total price is not negative
        }));
      }
    }
  }, [formData2.item_name, formData2.area_in_square_meters, formData2.discount_price, stockItemss]);
  
  

  useEffect(() => {
    if (formData.item_name) {
      const selectedItem = stockItems.find(item => item.name === formData.item_name);
      if (selectedItem) {
        const priceWithoutDiscount = selectedItem.price_per_unit * formData.quantity;
        const discount = formData.discount_price || 0; // Use discount if provided, otherwise default to 0
        const totalPrice = priceWithoutDiscount - discount;
  
        setFormData(prevData => ({
          ...prevData,
          total_price: totalPrice > 0 ? totalPrice : 0 // Ensure total price does not go negative
        }));
      }
    }
  }, [formData.item_name, formData.quantity, formData.discount_price, stockItems]);
  

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const response = await axios.post(`${BASE_URL}/api/dataa/`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEntries([...entries, response.data]);
        setFormData({ date: '', item_name: '', quantity: '', total_price: '', discount_price:''});
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          // Display the specific error message
          alert(error.response.data.error); 
        } else {
          console.error('Data submission failed:', error.response ? error.response.data : error.message);
        }
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
        const response = await axios.post(`${BASE_URL}/api/data2a/`, formData2, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEntriess([...entriess, response.data]);
        setFormData2({ date: '', item_name: '', area_in_square_meters: '', total_price: '', });
      } catch (error) {
        console.error('Data submission failed:', error.response ? error.response.data : error.message);
      }
    } else {
      console.error('No token found');
    }
  };
  const handleSubmit3 = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const response = await axios.post(`${BASE_URL}/api/dataexpensea/`, formData3, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEntriesss([...entries, response.data]);
        setFormData3({ date: '', expense_name: '', expenses: '', });
      } catch (error) {
        console.error('Data submission failed:', error.response ? error.response.data : error.message);
      }
    } else {
      console.error('No token found');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'quantity' || name === 'discount_price' ||name === 'total_price' ? parseFloat(value) || '' : value
    });
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2({
      ...formData2,
      [name]: name === 'area_in_square_meters' || name === 'discount_price' || name === 'total_price'  ? parseFloat(value) || '' : value
    });
  };

  const handleChange3 = (e) => {
  const { name, value } = e.target;
  setFormData3({
    ...formData3,
    [name]: name === 'expenses' ? parseFloat(value) || '' : value,
  });
};



  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access_token'); // Retrieve the token here
  
      if (token) {
        try {
          setLoading(true);
  
          const response = await axios.get(`${BASE_URL}/data/yearly/`, {
            headers: { Authorization: `Bearer ${token}` }, // Use the token in the headers
            params: { year: '2024' }
          });
  
          if (response.status === 200) {
            setLoading(true);
            const { daily_totals } = response.data;
            
            // Process the data for the chart
            const monthlySalesData = Array(12).fill(0);
            daily_totals.forEach((item) => {
              const month = new Date(item.date).getMonth();
              monthlySalesData[month] += item.total_sales;
            });
  
            setChartSeries([{ name: 'Sales', data: monthlySalesData }]);
            setLoading(true);
          } else {
            console.error(`Unexpected response status: ${response.status}`);
          }
        } catch (error) {
          console.error("Error fetching data:", error.response ? error.response.data : error.message);
        } finally {
          setLoading(false);
        }
      } else {
        console.error('No token found');
      }
    };
  
    fetchData();
  }, []); 
  
  

  

  

  if (loading) {
    return <div>Loading...</div>;
  }
  const formatCurrency = (value) => {
    const numericValue = Number(value) || 0;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericValue).replace('TZS', 'Tsh');
  };

  return (
  <>
    <Head>
      <title>
        Forms
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
        
          <Grid container spacing={3} sx={{
              p: 2, alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <CardContent>
                <div className="form-container4">

                <form onSubmit={handleSubmit}>
                <h2>SALES</h2>
                <CardContent>
                      <Stack
                        spacing={3}
                        sx={{ maxWidth: 400 }}
                      >
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
                <select
                  name="item_name"
                  value={formData.item_name}
                  onChange={handleChange}
                  required
                >
                  <option value="">Choose Stock</option>
                  {stockItems.map((item, index) => (
                    <option key={index} value={item.name}>{item.name}</option>
                  ))}
                </select>
                <TextField
                fullWidth
                          label="Quantity"
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
                <TextField
                fullWidth
                          label="Discount Price (optional)"
                  type="number"
                  name="discount_price"
                  value={formData.discount_price} 
                  onChange={handleChange}
                />
                <TextField
                  type="text"
                  name="total_price"
                  value={formatCurrency(formData.total_price)}
                  readOnly
                />

                <Button variant="contained" type="submit">Submit</Button>
                </Stack></CardContent>
              </form>


              <form onSubmit={handleSubmit2}>
                <h2>SALES FOR BANNER AND STICKER</h2>
                <CardContent>
                      <Stack
                        spacing={3}
                        sx={{ maxWidth: 400 }}
                      >
                <input
                  type="date"
                  name="date"
                  value={formData2.date}
                  onChange={handleChange2}
                  required
                />
                <select
                  name="item_name"
                  value={formData2.item_name}
                  onChange={handleChange2}
                  required
                >
                  <option value="">Choose Stock</option>
                  {stockItemss.map((item, index) => (
                    <option key={index} value={item.stock_name}>{item.stock_name}</option>
                  ))}
                </select>
                <TextField
                fullWidth
                          label="Quantity(m2)"
                  type="number"
                  name="area_in_square_meters"
                  value={formData2.area_in_square_meters || ''}
                  onChange={handleChange2}
                  step="any"
                  required
                />
                <TextField
                fullWidth
                          label="Discount Price (optional)"
                type="number"
                name="discount_price"
                value={formData2.discount_price} // Use the raw value
                onChange={handleChange2}
              />
                <TextField
                
                  type="text"
                  name="total_price"
                  value={formatCurrency(formData2.total_price)}
                  readOnly
                />

                <Button variant="contained" type="submit">Submit</Button>
                </Stack></CardContent>
              </form>

              <form onSubmit={handleSubmit3}>
                <h2>EXPENSES</h2>
                <CardContent>
                      <Stack
                        spacing={3}
                        sx={{ maxWidth: 400 }}
                      >
                <input
                  type="date"
                  name="date"
                  value={formData3.date}
                  onChange={handleChange3}
                  required
                />
                <TextField
                fullWidth
                          label="Expense Name"
                  type="text"
                  name="expense_name"
                  value={formData3.expense_name}
                  onChange={handleChange3}
                  required
                />
                <TextField
                fullWidth
                          label="Expense Price"
                  type="number"
                  name="expenses"
                  value={formData3.expenses}
                  onChange={handleChange3}
                  required
                />
                <Button variant="contained" type="submit">Submit</Button>
                </Stack></CardContent>
              </form>

                </div>
              </CardContent>

            </Grid>
        </Grid>
      </Container>
    </Box>
  </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
