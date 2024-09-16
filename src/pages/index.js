import Head from 'next/head';
// import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalDebts } from 'src/sections/overview/overview-total-debts';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../api';
import { format, startOfWeek, endOfWeek, addWeeks, subDays } from 'date-fns';

const now = new Date();
const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  try {
    const response = await axios.post(`${BASE_URL}/api/token/refresh/`, {
      refresh: refreshToken
    });
    localStorage.setItem('access_token', response.data.access);
  } catch (error) {
    console.error('Token refresh failed:', error.response ? error.response.data : error.message);
  }
};

axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshToken();
      const newToken = localStorage.getItem('access_token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

const Page = () => {
  const [weeklyTotals, setWeeklyTotals] = useState({});
  const [dailyTotals, setDailyTotals] = useState({});
  const [chartSeries, setChartSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchWeeklyReport = async () => {
  //     const token = localStorage.getItem('access_token');

  //     // Get today's date
  //     const today = new Date();

  //     let startOfWeekDate, endOfWeekDate;

  //     // If today is Monday, fetch the report for the previous week (Monday to Sunday)
  //     if (today.getDay() === 1) { // Monday
  //       startOfWeekDate = startOfWeek(subDays(today, 7), { weekStartsOn: 1 }); // Previous week's Monday
  //       endOfWeekDate = endOfWeek(subDays(today, 7), { weekStartsOn: 1 }); // Previous week's Sunday
  //     } else {
  //       // Otherwise, fetch the report for the current week (Monday to Sunday)
  //       startOfWeekDate = startOfWeek(today, { weekStartsOn: 1 }); // Current week's Monday
  //       endOfWeekDate = endOfWeek(today, { weekStartsOn: 1 }); // Current week's Sunday
  //     }

  //     // Format the dates to 'YYYY-MM-DD'
  //     const startDate = format(startOfWeekDate, 'yyyy-MM-dd');
  //     const endDate = format(endOfWeekDate, 'yyyy-MM-dd');

  //     if (token) {
  //       try {
  //         setLoading(true);
  //         const response = await axios.get(`${BASE_URL}/data/weekly/`, {
  //           headers: { Authorization: `Bearer ${token}` },
  //           params: { start_date: startDate, end_date: endDate },
  //         });
  //         console.log(response.data)
  //         setWeeklyTotals(response.data.weekly_totals);
  //         setDailyTotals(response.data.daily_totals);
  //         setLoading(false);
  //       } catch (error) {
  //         console.error(
  //           'Error fetching weekly report:',
  //           error.response ? error.response.data : error.message,
  //         );
  //         setLoading(false);
  //       }
  //     } else {
  //       console.error('No token found');
  //     }
  //   };

  //   fetchWeeklyReport();
  // }, []);

  useEffect(() => {
    const fetchWeeklyReport = async () => {
      const token = localStorage.getItem('access_token');
  
      // Get today's date
      const today = new Date();
  
      let startOfWeekDate, endOfWeekDate;
  
      // Check if today is Monday or another day
      if (today.getDay() === 1) { // If today is Monday
        // Start a new week from today (Monday)
        startOfWeekDate = startOfWeek(today, { weekStartsOn: 1 }); // Current week's Monday
        endOfWeekDate = endOfWeek(today, { weekStartsOn: 1 }); // Current week's Sunday
      } else {
        // Otherwise, fetch the report for the current week
        startOfWeekDate = startOfWeek(today, { weekStartsOn: 1 }); // Current week's Monday
        endOfWeekDate = endOfWeek(today, { weekStartsOn: 1 }); // Current week's Sunday
      }
  
      // Format the dates to 'YYYY-MM-DD'
      const startDate = format(startOfWeekDate, 'yyyy-MM-dd');
      const endDate = format(endOfWeekDate, 'yyyy-MM-dd');
  
      if (token) {
        try {
          setLoading(true);
          const response = await axios.get(`${BASE_URL}/data/weekly/`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { start_date: startDate, end_date: endDate },
          });
          
          // Check if we are at the beginning of a new week (Monday)
          if (today.getDay() === 1) { 
            // If it's Monday, reset the weekly totals
            setWeeklyTotals(0);
            setDailyTotals([]);
          } else {
            // Otherwise, load the data as usual
            setWeeklyTotals(response.data.weekly_totals);
            setDailyTotals(response.data.daily_totals);
          }
  
          setLoading(false);
        } catch (error) {
          console.error(
            'Error fetching weekly report:',
            error.response ? error.response.data : error.message,
          );
          setLoading(false);
        }
      } else {
        console.error('No token found');
      }
    };
  
    fetchWeeklyReport();
  }, []);
  

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access_token'); // Retrieve the token here

      if (token) {
        try {
          setLoading(true);

          const response = await axios.get(`${BASE_URL}/data/yearly/`, {
            headers: { Authorization: `Bearer ${token}` }, // Use the token in the headers
            params: { year: '2024' },
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
          console.error(
            'Error fetching data:',
            error.response ? error.response.data : error.message,
          );
        } finally {
          setLoading(false);
        }
      } else {
        console.error('No token found');
      }
    };

    fetchData();
  }, []); // Ensure an empty dependency array to run this only once

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
    })
      .format(numericValue)
      .replace('TZS', 'Tsh');
  };

  return (
    <>
      <Head>
        <title>Overview</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={4}>
              <OverviewBudget
                difference={12}
                positive
                sx={{ height: '100%' }}
                value={formatCurrency(weeklyTotals.total_sales)}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={4}>
              <OverviewTotalCustomers
                difference={16}
                positive={false}
                sx={{ height: '100%' }}
                value={formatCurrency(weeklyTotals.total_expenses)}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={4}>
              <OverviewTotalDebts
                difference={16}
                positive={false}
                sx={{ height: '100%' }}
                value={formatCurrency(weeklyTotals.total_debts)}
              />
            </Grid>
            {/* <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={75.5}
            />
          </Grid> */}
            <Grid xs={12} sm={6} lg={4}>
              <OverviewTotalProfit
                sx={{ height: '100%' }}
                value={formatCurrency(weeklyTotals.profit)}
              />
            </Grid>
            <Grid xs={12} lg={12}>
              <OverviewSales
                chartSeries={chartSeries}
                sx={{ height: '100%' }}
              />
            </Grid>

            <Grid xs={12} md={12} lg={12}>
              <OverviewLatestOrders
                orders={[
                  {
                    id: 'f69f88012978187a6c12897f',
                    ref: 'KIKOMBE BLACK',
                    amount: 30.5,
                    customer: {
                      name: 'Ekaterina Tankova',
                    },
                    createdAt: 1555016400000,
                    status: 'pending',
                  },
                  {
                    id: '9eaa1c7dd4433f413c308ce2',
                    ref: 'KIKOMBE WHITE',
                    amount: 25.1,
                    customer: {
                      name: 'Cao Yu',
                    },
                    createdAt: 1555016400000,
                    status: 'PAID',
                  },
                  {
                    id: '01a5230c811bd04996ce7c13',
                    ref: 'BANNER',
                    amount: 10.99,
                    customer: {
                      name: 'Alexa Richardson',
                    },
                    createdAt: 1554930000000,
                    status: 'REFUNDED',
                  },
                  {
                    id: '1f4e1bd0a87cea23cdb83d18',
                    ref: 'STICKER',
                    amount: 96.43,
                    customer: {
                      name: 'Anje Keizer',
                    },
                    createdAt: 1554757200000,
                    status: 'pending',
                  },
                  {
                    id: '9f974f239d29ede969367103',
                    ref: 'CHUPA',
                    amount: 32.54,
                    customer: {
                      name: 'Clarke Gillebert',
                    },
                    createdAt: 1554670800000,
                    status: 'PAID',
                  },
                  {
                    id: 'ffc83c1560ec2f66a1c05596',
                    ref: 'STICKER',
                    amount: 16.76,
                    customer: {
                      name: 'Adam Denisov',
                    },
                    createdAt: 1554670800000,
                    status: 'PAID',
                  },
                ]}
                sx={{ height: '100%' }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
