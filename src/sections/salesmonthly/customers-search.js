import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import React, { useState, useEffect } from 'react';

export const CustomersSearch = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [stockReport, setStockReport] = useState([]);
  const [stockReport2, setStockReport2] = useState([]);
  const [noDataMessage, setNoDataMessage] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchStockReport = async (url, setStateCallback) => {
      if (!selectedMonth) {
        setStateCallback([]);
        setNoDataMessage('');
        return;
      }

      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          setLoading(true);
          const response = await axios.get(`${BASE_URL}${url}`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { month: selectedMonth },
          });

          if (response.data.length === 0) {
            setStateCallback([]);
            setNoDataMessage('No stock data available for the selected month.');
          } else {
            setStateCallback(response.data);
            setNoDataMessage('');
          }
        } catch (error) {
          console.error('Error fetching stock report:', error.response ? error.response.data : error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStockReport('/api/stock/report/', setStockReport);
    fetchStockReport('/api/stock/report2/', setStockReport2);
  }, [selectedMonth]);
  return(
  <Card sx={{ p: 2 }}>
    <div>
                  <label variant="h6">Select Month:</label>
                  <input variant="h6"
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                  />
                </div>
    
  </Card>
  )
  }
