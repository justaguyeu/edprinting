import PropTypes from 'prop-types';
import { format } from 'date-fns';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../api';

import {
  Avatar,
  Box,
  Card,
  TextField,
  CardContent,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [filteredEntriess, setFilteredEntriess] = useState([]);
  const [filteredEntriesss, setFilteredEntriesss] = useState([]);
  const [filteredOutofstock, setFilteredOutofstock] = useState([]);
  const [outofstock, setOutofstock] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchEntries = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          setLoading(true);
          const response = await axios.get(`${BASE_URL}/api/data/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(response.data)
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
    const fetchOutofstock = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          setLoading(true);
          const response = await axios.get(`${BASE_URL}/api/dataoutofstock/`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(response.data)
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
    if (selectedDate) {
      const filtered = entries.filter((entry) => entry.date === selectedDate);
      setFilteredEntries(filtered);
    } else {
      setFilteredEntries([]);
    }
  }, [selectedDate, entries]);

  useEffect(() => {
    if (selectedDate) {
      const filtered = entriesss.filter((entry) => entry.date === selectedDate);
      setFilteredEntriesss(filtered);
    } else {
      setFilteredEntriesss([]);
    }
  }, [selectedDate, entriesss]);

  useEffect(() => {
    if (selectedDate) {
      const filtered = entriess.filter((entry) => entry.date === selectedDate);
      setFilteredEntriess(filtered);
    } else {
      setFilteredEntriess([]);
    }
  }, [selectedDate, entriess]);

  useEffect(() => {
    if (selectedDate) {
      const filtered = outofstock.filter(
        (entry) => entry.date === selectedDate,
      );
      setFilteredOutofstock(filtered);
    } else {
      setFilteredOutofstock([]);
    }
  }, [selectedDate, outofstock]);


  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
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




  // Handle Edit button click
  const handleEdit = (entry) => {
    setEditData(entry); // Populate modal with the selected entry data
    setOpenEditModal(true);
  };

  // Handle input change inside the modal
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Save the updated data
  // const handleSave = async () => {
  //   const token = localStorage.getItem('access_token');
  //   if (token) {
  //   try {
  //     // await axios.put(`${BASE_URL}/api/dataa/${editData.id}/`, editData, {
  //       const response = await axios.get(`${BASE_URL}/api/dataa/${editData.id}/`, editData, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setOpenEditModal(false); // Close modal on success
  //     setEntries(response.data); // Refresh the data after edit
  //   } catch (error) {
  //     console.error(
  //       'Error updating data:',
  //       error.response ? error.response.data : error.message,
  //     );
  //   }}
  // };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const response = await axios.put(`${BASE_URL}/api/data/${editData.id}/`, editData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOpenEditModal(false);
        // Update the entries state to reflect the edited data
        setEntries((prevEntries) => prevEntries.map(entry => 
          entry.id === editData.id ? response.data : entry
        ));
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
          alert(error.response.data.error);
        } else {
          console.error(
            'Data submission failed:',
            error.response ? error.response.data : error.message,
          );
        }
      } finally {
        setLoading(false);
      }
    } else {
      console.error('No token found');
    }
  };

  const handleOpenEditModal = (entry) => {
    setEditData({
      date: entry.date,
      item_name: entry.expense_name,
      quantity: entry.expenses,
    });
    setOpenEditModal(true); // Open the modal
  };
  


  return (
    <>
      <Card sx={{ p: 2 }}>
        <div>
          <label htmlFor="date-filter"> Select Date to view: </label>
          <input
            type="date"
            id="date-filter"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
      </Card>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {selectedDate ? (
            filteredEntries.length > 0 ||
            filteredEntriess.length > 0 ||
            filteredOutofstock.length > 0 ||
            filteredEntriesss.length > 0 ? (
              <>
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
                                {/* <TableCell>USERNAME</TableCell> */}
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
                                    {/* <TableCell>
                                      {entry.user ? entry.user : 'N/A'}
                                    </TableCell> */}
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
                                    {/* <TableCell>
                                      {entry.user ? entry.user : 'N/A'}
                                    </TableCell> */}
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
                                    {/* <TableCell>
                                      
                                      <Button
                                        variant="outlined"
                                        onClick={() => handleEdit(entry)}
                                      >
                                        Edit
                                      </Button>
                                    </TableCell> */}
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
                              <TableCell>DATE</TableCell>
                              <TableCell> NAME</TableCell>
                              <TableCell>PRICE</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredOutofstock.map((entry) => {
                              return (
                                <TableRow>
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
                                {/* <TableCell>USERNAME</TableCell> */}
                                <TableCell>DATE</TableCell>
                                <TableCell>EXPENSE TYPE</TableCell>
                                <TableCell>EXPENSE PRICE</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {filteredEntriesss.map((entry) => {
                                return (
                                  <TableRow>
                                    {/* <TableCell>
                                      {entry.user ? entry.user : 'N/A'}
                                    </TableCell> */}
                                    <TableCell>{entry.date}</TableCell>
                                    <TableCell>{entry.expense_name}</TableCell>
                                    <TableCell>
                                      {formatCurrency(entry.expenses) || 0}
                                    </TableCell>
                                    <TableCell>
                                      {/* Add Edit Button */}
                                      {filteredEntriesss.map((entry) => (
  <Button key={entry.id} onClick={() => handleOpenEditModal(entry)}>
    Edit
  </Button>
))}

                                      {/* <Button
                                        variant="outlined"
                                        onClick={() => handleEdit(entry)}
                                      >
                                        Edit
                                      </Button> */}
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
                </>
                <Dialog
                  open={openEditModal}
                  onClose={() => setOpenEditModal(false)}
                >
                  <DialogTitle>Edit Expense</DialogTitle>
                  <DialogContent>
                    <TextField
                      label="Expense Name"
                      name="item_name"
                      value={editData.item_name || ''}
                      onChange={handleEditChange}
                      fullWidth
                      margin="normal"
                    />
                    <TextField
                      label="Expense Price"
                      name="quantity"
                      value={editData.quantity || ''}
                      onChange={handleEditChange}
                      fullWidth
                      margin="normal"
                    />
                    
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenEditModal(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSave} variant="contained">
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            ) : (
              <p>No data available for the selected date .</p>
            )
          ) : (
            <p>Please select date to view the data.</p>
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
