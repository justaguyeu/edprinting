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
  const [allStock, setAllStock] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [loading, setLoading] = useState(false);
  const [noDataMessage, setNoDataMessage] = useState('');

  useEffect(() => {
    const fetchAllStock = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          setLoading(true);

          // Fetch data from the first stock endpoint
          const response1 = await axios.get(`${BASE_URL}/api/stock/report/`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          // Fetch data from the second stock endpoint
          const response2 = await axios.get(`${BASE_URL}/api/stock/report2/`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          // Combine the data from both endpoints
          const combinedStock = [
            ...response1.data.map((item) => ({
              name: item.item_name,
              quantity: item.total_quantity,
              quantity_used: item.quantity_used,
              remaining_stock: item.remaining_stock,
            })),
            ...response2.data.map((item) => ({
              name: item.item_name,
              quantity: `${item.total_quantity} m²`,
              quantity_used: `${item.quantity_used} m²`,
              remaining_stock: `${item.remaining_stock} m²`,
            })),
          ];
          if (combinedStock.length === 0) {
            setAllStock([]);
            setNoStockMessage('No stock data available.');
          } else {
            setAllStock(combinedStock);
            setNoStockMessage('');
          }

          setLoading(false);
        } catch (error) {
          console.error(
            'Error fetching stock data:',
            error.response ? error.response.data : error.message,
          );
          setLoading(false);
        }
      }
    };

    fetchAllStock();
  }, []);

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
      <CardContent>
        <Card>
          <Scrollbar>
            <Box sx={{ minWidth: 800 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>STOCK NAME</TableCell>
                    <TableCell>QUANTITY/(m&sup2;)</TableCell>
                    <TableCell>USED STOCK/(M&sup2;)</TableCell>
                    <TableCell>REMAINED STOCK/(M&sup2;)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allStock.map((item) => {
                    return (
                      <TableRow>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.quantity_used}</TableCell>
                        <TableCell>{item.remaining_stock}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Scrollbar>
          {/* <TablePagination
          component="div"
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]} /> */}
        </Card>
      </CardContent>
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
