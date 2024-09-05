import PropTypes from 'prop-types';
import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../api';

import {
  Avatar,
  Box,
  Card,
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
  const [selectedMonth, setSelectedMonth] = useState('');
  const [stockReport, setStockReport] = useState([]);
  const [stockReport2, setStockReport2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noDataMessage, setNoDataMessage] = useState('');

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
          console.error(
            'Error fetching stock report:',
            error.response ? error.response.data : error.message,
          );
        } finally {
          setLoading(false);
        }
      }
    };

    fetchStockReport('/api/stock/report/', setStockReport);
    fetchStockReport('/api/stock/report2/', setStockReport2);
  }, [selectedMonth]);

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

  return (
    <>
      <Card sx={{ p: 2 }}>
        <div>
          <label variant="h6">Select Month:</label>
          <input
            variant="h6"
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </div>
      </Card>
      <Card>
        <Scrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>STOCK NAME</TableCell>
                  <TableCell>TOTAL STOCK</TableCell>
                  <TableCell>USED STOCK</TableCell>
                  <TableCell>REMAINED STOCK</TableCell>
                  <TableCell>USED STOCK PRICE</TableCell>
                  <TableCell>REMAINED STOCK PRICE</TableCell>
                  <TableCell>TOTAL STOCK PRICE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stockReport.map((item) => {
                  return (
                    <TableRow>
                      <TableCell>{item.item_name}</TableCell>
                      <TableCell>{item.total_quantity}</TableCell>
                      <TableCell>{item.quantity_used}</TableCell>
                      <TableCell>{item.remaining_stock}</TableCell>
                      <TableCell>
                        {formatCurrency(item.total_value_used)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(item.total_value_unused)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(item.total_value_stock)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableBody>
                {stockReport2.map((item) => {
                  return (
                    <TableRow>
                      <TableCell>{item.item_name}</TableCell>
                      <TableCell>{item.total_quantity}</TableCell>
                      <TableCell>{item.quantity_used}</TableCell>
                      <TableCell>{item.remaining_stock}</TableCell>
                      <TableCell>
                        {formatCurrency(item.total_value_used)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(item.total_value_unused)}
                      </TableCell>
                      <TableCell>
                        {formatCurrency(item.total_value_stock)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
        <TablePagination
          component="div"
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
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
